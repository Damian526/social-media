import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: Socket) {
    console.log('New client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('Message received:', data);
    client.broadcast.emit('message', data);
  }
}