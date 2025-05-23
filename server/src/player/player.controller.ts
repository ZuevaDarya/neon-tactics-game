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
import { ChangePlayer } from './dto/change-player.dto';
import { CreatePlayer } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createPlayer(@Body() player: CreatePlayer) {
    return this.playerService.createPlayer(player);
  }

  @Get()
  getPlayerById(id: string) {
    return this.playerService.getPlayerById(id);
  }

  @Get(':roomId')
  getAllPlayersInRoom(@Param('roomId') id: string) {
    return this.playerService.getAllPlayersInRoom(id);
  }

  @Patch()
  updatePlayer(id: string, @Body() player: ChangePlayer) {
    return this.playerService.updatePlayer(id, player);
  }

  @Delete()
  deletePlayerById(id: string) {
    return this.playerService.deletePlayerById(id);
  }
}
