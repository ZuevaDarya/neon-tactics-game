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
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(@Body() player: CreatePlayerDTO) {
    return this.playerService.create(player);
  }

  @Get()
  async findById(id: string) {
    return this.playerService.findById(id);
  }

  @Get(':roomId')
  async getAllInRoom(@Param('roomId') id: string) {
    if (!id) {
      throw new Error('Room ID is required');
    }

    return this.playerService.getAllInRoom(id);
  }

  @Patch()
  async update(id: string, @Body() player: UpdatePlayerDTO) {
    return this.playerService.update(id, player);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(id: string) {
    return this.playerService.deleteById(id);
  }

  @Patch()
  async changeActiveStatus(id: string, isActive: boolean) {
    return this.playerService.changeActiveStatus(id, isActive);
  }

  @Get()
  async getPieceCount(id: string) {
    return this.playerService.getPieceCount(id);
  }

  @Patch()
  async decrementPieceCount(id: string) {
    return this.playerService.decrementPieceCount(id);
  }
}
