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
import { SocketService } from 'src/socket/socket.service';
import { CreateGameFieldDTO } from './dto/create-game-field.dto';
import { UpdateGameFieldDTO } from './dto/update-game-field.dto';
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

  @Get(':roomId')
  async findByRoomId(@Param('roomId') id: string) {
    return this.gameFieldService.findByRoomId(id);
  }

  @Delete(':roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByRoomId(@Param('roomId') id: string) {
    return this.gameFieldService.deleteByRoomId(id);
  }

  @Patch(':roomId')
  async update(@Param('roomId') id: string, @Body() data: UpdateGameFieldDTO) {
    const field = await this.gameFieldService.update(id, data);
    this.socketService.emitToRoom(id, SocketEvent.UpdateField, field);

    return field;
  }
}
