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

  @Get('room/:roomId')
  async getAllInRoom(@Param('roomId') id: string) {
    if (!id) {
      throw new Error('Room ID is required');
    }
    return this.playerService.getAllInRoom(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() player: UpdatePlayerDTO) {
    return this.playerService.update(id, player);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    return this.playerService.deleteById(id);
  }

  @Patch(':id/active-status')
  async changeActiveStatus(@Param('id') id: string, isActive: boolean) {
    return this.playerService.changeActiveStatus(id, isActive);
  }

  @Get(':id/piece-count')
  async getPieceCount(id: string) {
    return this.playerService.getPieceCount(id);
  }

  @Patch(':id/decrement-piece')
  async decrementPieceCount(id: string) {
    return this.playerService.decrementPieceCount(id);
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

    await this.socketService.joinRoom(socketId, data.room.roomId);
    this.socketService.emitToRoom(
      data.room.roomId,
      SocketEvent.CreateRoom,
      data,
    );

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

    await this.socketService.joinRoom(socketId, data.room.roomId);
    this.socketService.emitToRoom(data.room.roomId, SocketEvent.JoinRoom, data);

    return data;
  }
}
