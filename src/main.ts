import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security middlewares
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  await app.listen(3000);
}
bootstrap();
