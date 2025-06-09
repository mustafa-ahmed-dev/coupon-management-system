import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@common/modules/config/config.service';
import { PrismaExceptionFilter } from '@prisma/prisma-exception.filter';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'] as const,
    bodyParser: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        return errors.map((error) => ({
          statusCode: 400,
          message: error.constraints ? Object.values(error.constraints) : [],
          errorCode: 'VALIDATION_ERROR',
        }));
      },
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // Optional: Add a health check endpoint
  // app.getHttpAdapter().get('/health', (req, res) => {
  //   res.status(200).json({
  //     status: 'ok',
  //     timestamp: new Date().toISOString(),
  //     service: 'api',
  //   });
  // });

  const configService = app.get(ConfigService);
  const port = configService.appConfig.port;
  const apiBaseUrl = configService.appConfig.apiBaseUrl;
  const frontendUrl = configService.appConfig.frontendUrl;

  const corsOptions: CorsOptions = {
    origin: frontendUrl,
    credentials: true,
  };
  app.enableCors(corsOptions);

  Logger.log(`🚀 API Server is running on: ${apiBaseUrl}`);
  Logger.log(`🌐 CORS enabled for: ${frontendUrl}`);

  await app.listen(port);
}

bootstrap();
