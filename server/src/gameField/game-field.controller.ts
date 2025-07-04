import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SocketEvent } from 'src/constants/socket-event';
import { SocketService } from 'src/socket/socket.service';
import { CreateGameFieldDTO } from './dto/create-game-field.dto';
import { GameFieldService } from './game-field.service';

@Controller('game')
export class GameFieldController {
  constructor(
    private readonly gameFieldService: GameFieldService,
    private readonly socketService: SocketService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(@Body() gameFieldData: CreateGameFieldDTO) {
    const data = await this.gameFieldService.create(gameFieldData);

    this.socketService.emitToRoom(
      data.roomId,
      SocketEvent.CreateGameField,
      data,
    );

    return data;
  }

  @Get()
  async findByRoomId(@Body() { roomId }: { roomId: string }) {
    return this.gameFieldService.findByRoomId(roomId);
  }

  @Delete()
  async deleteByRoomId(@Body() { roomId }: { roomId: string }) {
    return this.gameFieldService.deleteByRoomId(roomId);
  }
}
