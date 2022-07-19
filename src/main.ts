import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setupApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const setApp = setupApp(app);
  await setApp.listen(3333);
}
bootstrap();
