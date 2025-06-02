import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
// import ClassTransformer from '@nestjs/class-transformer';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
