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
import { PlayerRoomService } from 'src/player/player-room.service';
import { SocketService } from 'src/socket/socket.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { UpdateGameDTO } from './dto/update-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly socketService: SocketService,
    private readonly playerRoomService: PlayerRoomService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(@Body() gameData: CreateGameDTO) {
    const data = await this.gameService.create(gameData);

    this.socketService.emitToRoom(data.roomId, SocketEvent.CreateGame, data);

    return data;
  }

  @Get(':roomId')
  async findByRoomId(@Param('roomId') id: string) {
    return this.gameService.findByRoomId(id);
  }

  @Delete(':roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByRoomId(@Param('roomId') id: string) {
    return this.gameService.deleteByRoomId(id);
  }

  @Patch(':roomId')
  async update(@Param('roomId') id: string, @Body() data: UpdateGameDTO) {
    const field = await this.gameService.update(id, data);
    this.socketService.emitToRoom(id, SocketEvent.UpdateGame, field);

    return field;
  }

  @Patch(':roomId/increment-count-turn')
  async incrementCountTurn(@Param('roomId') id: string) {
    const data = await this.gameService.incrementCountTurn(id);
    this.socketService.emitToRoom(id, SocketEvent.IncrementCountTurn, data);

    return data;
  }

  @Patch(':roomId/reset-game')
  async resetGame(@Param('roomId') id: string) {
    const data = await this.playerRoomService.resetGame(id);
    this.socketService.emitToRoom(id, SocketEvent.ResetGame, data);

    return data;
  }

  @Patch(':roomId/shuffle-field')
  async shuffleField(@Param('roomId') id: string) {
    const data = await this.gameService.shuffleField(id);
    this.socketService.emitToRoom(id, SocketEvent.ShuffleField, data);

    return data;
  }

  @Delete(':roomId/leave-game')
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.NO_CONTENT)
  async leaveGame(
    @Param('roomId') id: string,
    @Headers('x-socket-id') socketId: string,
  ) {
    await this.socketService.leaveRoom(socketId, id);
    return await this.playerRoomService.leaveGame(id);
  }
}
