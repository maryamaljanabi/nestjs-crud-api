import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // security middlewares
  app.enableCors();
  app.use(helmet());
  app.use(csurf());

  await app.listen(3000);
}
bootstrap();
