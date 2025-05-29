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

import { CreateRoomDTO } from './models/dto/create-room.dto';
import { UpdateRoomDTO } from './models/dto/update-room.dto';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(@Body() room: CreateRoomDTO) {
    return this.roomService.create(room);
  }

  @Get(':roomId')
  async findById(@Param('roomId') id: string) {
    return this.roomService.findById(id);
  }

  @Patch()
  async update(id: string, room: UpdateRoomDTO) {
    return this.roomService.update(id, room);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(id: string) {
    return this.roomService.deleteById(id);
  }

  @Patch()
  async updatePlayerId(roomId: string, playerId: string) {
    return this.roomService.updatePlayerId(roomId, playerId);
  }

  @Patch()
  async resetPlayerId(roomId: string) {
    return this.roomService.resetPlayerId(roomId);
  }
}
