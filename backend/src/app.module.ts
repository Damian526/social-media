import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module'; // We'll create this module next
import { ChatGateway } from './chat.gateway'; // WebSocket gateway
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DATABASE || 'mongodb://localhost:27017/mydb',
    ),
    UsersModule,
  ],
  providers: [ChatGateway], // Include the WebSocket gateway
})
export class AppModule {}
