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

  private roomSessions = new Map<string, Set<string>>(); //roomId -> Set(socketId)
  private playerSessions = new Map<string, string>(); //socketId -> playerId

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const { token, roomId } = client.handshake.auth;
    if (token && roomId) {
      await this.handleReconnect(client, String(roomId), String(token));
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const roomId = this.getRoomBySocket(client.id);
    if (roomId) {
      this.cleanUpSocket(client.id, roomId);
    }
  }

  handleError(error: unknown): never {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error || error instanceof HttpException) {
      errorMessage = error.message;
    }

    throw new BadRequestException(errorMessage);
  }

  private async handleReconnect(
    client: Socket,
    roomId: string,
    socketId: string,
  ) {
    if (this.roomSessions.has(roomId)) {
      await client.join(roomId);
      this.roomSessions.get(roomId)?.add(client.id);
      this.playerSessions.set(client.id, socketId);

      this.emitToRoom(roomId, SocketEvent.SyncState, {
        socketId: client.id,
        reconnected: true,
      });
    }
  }

  private getRoomBySocket(socketId: string) {
    for (const [roomId, sockets] of this.roomSessions.entries()) {
      if (sockets.has(socketId)) {
        return roomId;
      }
    }
    return null;
  }

  private cleanUpSocket(socketId: string, roomId: string) {
    this.playerSessions.delete(socketId);

    const roomSockets = this.roomSessions.get(roomId);

    if (roomSockets) {
      roomSockets.delete(socketId);
      if (roomSockets.size === 0) {
        this.roomSessions.delete(roomId);
      }
    }
  }

  async joinRoom(socketId: string, roomId: string, playerId: string) {
    const clientSocket = this.server.sockets.sockets.get(socketId);

    if (!clientSocket) {
      this.handleError(
        new BadRequestException('WebSocket connection not found'),
      );
    }

    try {
      await clientSocket.join(roomId);

      if (!this.roomSessions.has(roomId)) {
        this.roomSessions.set(roomId, new Set());
      }
      this.roomSessions.get(roomId)?.add(socketId);
      this.playerSessions.set(socketId, playerId);

      this.emitToRoom(roomId, SocketEvent.PlayerReconnected, {
        playerId,
        socketId,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  emitToRoom(roomId: string, event: TSocketEvent, data?: any) {
    this.server.to(roomId).emit(event, data);
  }

  async leaveRoom(socketId: string, roomId: string, notify = true) {
    const clientSocket = this.server.sockets.sockets.get(socketId);

    if (!clientSocket) {
      this.handleError(
        new BadRequestException('WebSocket connection not found'),
      );
    }

    try {
      const playerId = this.playerSessions.get(socketId);

      await clientSocket.leave(roomId);
      this.cleanUpSocket(socketId, roomId);

      if (playerId && notify) {
        this.emitToRoom(roomId, SocketEvent.LeaveRoom, { playerId, socketId });
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  @SubscribeMessage(SocketEvent.RedirectPlayers)
  handleStartGame(@MessageBody() payload: { roomId: string; url: string }) {
    this.emitToRoom(payload.roomId, SocketEvent.Redirect, { url: payload.url });
  }
}
