import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Start the HTTP server
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const HTTP_PORT = process.env.HTTP_PORT || 8000;
  await app.listen(HTTP_PORT);
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);

  // Start the WebSocket server on a separate port
  const webSocketApp = await NestFactory.create(AppModule);
  webSocketApp.useWebSocketAdapter(new IoAdapter(webSocketApp));
  const WS_PORT = process.env.WS_PORT || 4000;
  await webSocketApp.listen(WS_PORT);
  console.log(`WebSocket Server is running on port ${WS_PORT}`);
}
bootstrap();
