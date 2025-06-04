import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@common/modules/config/config.service';

import { PrismaExceptionFilter } from '@prisma/prisma-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'] as const,
    cors: true,
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
  app.use(helmet());

  const configService = app.get(ConfigService);
  const port = configService.appConfig.port || 3001;

  Logger.log(`Application is running on: http://localhost:${port}`);

  await app.listen(port);
}
bootstrap();
