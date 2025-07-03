import { BadRequestException, HttpException } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvent } from 'src/constants/socket-event';
import { TSocketEvent } from 'src/types/types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleError(error: unknown): never {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error || error instanceof HttpException) {
      errorMessage = error.message;
    }

    throw new BadRequestException(errorMessage);
  }

  async joinRoom(socketId: string, roomId: string) {
    const clientSocket = this.server.sockets.sockets.get(socketId);

    if (!clientSocket) {
      this.handleError(
        new BadRequestException('WebSocket connection not found'),
      );
    }

    try {
      await clientSocket.join(roomId);
    } catch (error) {
      this.handleError(error);
    }
  }

  emitToRoom(roomId: string, event: TSocketEvent, data: any) {
    this.server.to(roomId).emit(event, data);
  }

  @SubscribeMessage(SocketEvent.StartGame)
  handleStartGame(@MessageBody() payload: { roomId: string; url: string }) {
    this.emitToRoom(payload.roomId, SocketEvent.Redirect, { url: payload.url });
  }
}
