import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setupApp';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet())
  const setApp = setupApp(app);
  await setApp.listen(3333);
}
bootstrap();
