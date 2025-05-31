import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'] as const,
    cors: true,
    bodyParser: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
