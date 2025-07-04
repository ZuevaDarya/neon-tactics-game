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

import { TRoomStatus } from 'src/types/types';
import { CreateRoomDTO } from './dto/create-room.dto';
import { UpdateRoomDTO } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

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
    console.log('[ROOM STATUS]', status);
    return this.roomService.updateRoomStatus(roomId, status);
  }
}
