import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from './setupApp';
import helmet from 'helmet';
import { swaggerDoc } from './swagger/swagger';





async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet())
  const setApp = setupApp(app);
  swaggerDoc(setApp)
  const PORT = process.env.PORT || 9999
  await setApp.listen(PORT);
  console.log("listening on port:", PORT)
}
bootstrap();
