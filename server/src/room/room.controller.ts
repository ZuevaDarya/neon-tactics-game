import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { SocketEvent } from 'src/constants/socket-event';
import { PlayerRoomService } from 'src/player/player-room.service';
import { SocketService } from 'src/socket/socket.service';
import { TRoomStatus } from 'src/types/types';
import { CreateRoomDTO } from './dto/create-room.dto';
import { UpdateRoomDTO } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly playerRoomService: PlayerRoomService,
    private readonly socketService: SocketService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(@Body() room: CreateRoomDTO) {
    return this.roomService.create(room);
  }

  @Get(':roomId')
  async findById(@Param('roomId') roomId: string) {
    return this.roomService.findById(roomId);
  }

  @Patch(':roomId')
  async update(@Param('roomId') roomId: string, @Body() room: UpdateRoomDTO) {
    return this.roomService.update(roomId, room);
  }

  @Delete(':roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('roomId') roomId: string) {
    return this.roomService.deleteById(roomId);
  }

  @Patch(':roomId/player')
  async updatePlayerId(@Param('roomId') roomId: string, playerId: string) {
    return this.roomService.updatePlayerId(roomId, playerId);
  }

  @Patch(':roomId/reset-player')
  async resetPlayerId(@Param('roomId') roomId: string) {
    return this.roomService.resetPlayerId(roomId);
  }

  @Patch(':roomId/status')
  async updateRoomStatus(
    @Param('roomId') roomId: string,
    @Body() { status }: { status: TRoomStatus },
  ) {
    return this.roomService.updateRoomStatus(roomId, status);
  }

  @Patch(':roomId/assign-piece-type')
  @HttpCode(HttpStatus.OK)
  async assignRandomPieceType(@Param('roomId') roomId: string) {
    const data = await this.playerRoomService.assignRandomPieceType(roomId);
    this.socketService.emitToRoom(roomId, SocketEvent.AssignPieceType, data);

    return data;
  }

  @Patch(':roomId/select-active-player')
  @HttpCode(HttpStatus.OK)
  async selectActivePlayer(@Param('roomId') roomId: string) {
    const data = await this.playerRoomService.selectActivePlayer(roomId);
    this.socketService.emitToRoom(roomId, SocketEvent.SelectActivePlayer, {
      player: data,
    });

    return { player: data };
  }
}
