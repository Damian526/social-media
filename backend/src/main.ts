import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
