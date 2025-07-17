import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionOptions } from 'sequelize';
import { TRoomStatus } from 'src/types/types';
import { CreateRoomDTO } from './dto/create-room.dto';
import { UpdateRoomDTO } from './dto/update-room.dto';
import { Room } from './models/room.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room,
  ) {}

  async create(
    room: CreateRoomDTO,
    options?: TransactionOptions,
  ): Promise<Room> {
    return this.roomModel.create({ ...room }, { returning: true, ...options });
  }

  async findById(id: string, options?: TransactionOptions): Promise<Room> {
    const room = await this.roomModel.findByPk(id, options);

    if (!room) {
      throw new NotFoundException(`Room not found`);
    }

    return room;
  }

  async update(
    id: string,
    room: UpdateRoomDTO,
    options?: TransactionOptions,
  ): Promise<Room> {
    const [affectedCount, [updatedRoom]] = await this.roomModel.update(room, {
      where: { roomId: id },
      returning: true,
      ...options,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Room not found`);
    }

    return updatedRoom;
  }

  async deleteById(id: string, options?: TransactionOptions): Promise<void> {
    const deletedCount = await this.roomModel.destroy({
      where: { id },
      ...options,
    });

    if (deletedCount === 0) {
      throw new NotFoundException(`Room not found`);
    }
  }

  async updatePlayerId(
    id: string,
    playerId: string,
    options?: TransactionOptions,
  ): Promise<Room> {
    const room = await this.findById(id, options);

    if (room.playerId) {
      throw new Error('Room is full (max 2 players)');
    }

    return room.update({ playerId }, options);
  }

  async resetPlayerId(id: string, options?: TransactionOptions): Promise<Room> {
    const room = await this.findById(id);
    return room.update({ playerId: null }, options);
  }

  async updateRoomStatus(
    id: string,
    status: TRoomStatus,
    options?: TransactionOptions,
  ): Promise<Room> {
    const room = await this.findById(id);
    return room.update({ status }, options);
  }
}
