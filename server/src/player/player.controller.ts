import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { SocketEvent } from 'src/constants/socket-event';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SocketService } from 'src/socket/socket.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { JoinRoomDTO } from './dto/join-room.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { PlayerRoomService } from './player-room.service';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly playerRoomService: PlayerRoomService,
    private readonly socketService: SocketService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(@Body() playerData: CreatePlayerDTO) {
    return this.playerService.create(playerData);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.playerService.findById(id);
  }

  @Get('by-room/:roomId')
  async getAllInRoom(@Param('roomId') id: string) {
    if (!id) {
      throw new Error('Room ID is required');
    }
    const players = await this.playerService.getAllInRoom(id);
    return players;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() player: UpdatePlayerDTO) {
    return this.playerService.update(id, player);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.playerService.deleteById(id);
  }

  @Patch(':id/active-status')
  async changeActiveStatus(
    @Param('id') id: string,
    @Body() data: { isActive: boolean },
  ) {
    const player = await this.playerService.changeActiveStatus(
      id,
      data.isActive,
    );

    if (player.roomId) {
      this.socketService.emitToRoom(
        player.roomId,
        SocketEvent.ChangeActiveStatus,
        player,
      );
    }

    return player;
  }

  @Patch(':id/decrement-piece')
  async decrementPieceCount(@Param('id') id: string) {
    const data = await this.playerService.decrementPieceCount(id);

    if (data.roomId) {
      this.socketService.emitToRoom(
        data.roomId,
        SocketEvent.DecrementPieceCount,
        data,
      );
    }

    return data;
  }

  @Post('create-room')
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createWithRoom(
    @Body() playerData: CreatePlayerDTO,
    @Headers('x-socket-id') socketId: string,
  ) {
    const data = await this.playerRoomService.createWithRoom(playerData);

    await this.socketService.joinRoom(socketId, data.room.id);
    this.socketService.emitToRoom(data.room.id, SocketEvent.CreateRoom, data);

    return data;
  }

  @Post('join-room')
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async createWithJoinInRoom(
    @Body() playerData: JoinRoomDTO,
    @Headers('x-socket-id') socketId: string,
  ) {
    const data = await this.playerRoomService.createWithJoinInRoom(playerData);

    await this.socketService.joinRoom(socketId, data.room.id);
    this.socketService.emitToRoom(data.room.id, SocketEvent.JoinRoom, data);

    return data;
  }
}
