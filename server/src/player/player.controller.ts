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

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(@Body() player: CreatePlayerDTO) {
    return this.playerService.create(player);
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
}
