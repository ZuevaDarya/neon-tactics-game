import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionOptions } from 'sequelize';
import { CreateRoomDTO } from './models/dto/create-room.dto';
import { UpdateRoomDTO } from './models/dto/update-room.dto';
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

  async findById(roomId: string, options?: TransactionOptions): Promise<Room> {
    const room = await this.roomModel.findByPk(roomId, { ...options });

    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    return room;
  }

  async update(roomId: string, room: UpdateRoomDTO): Promise<Room> {
    const [affectedCount, [updatedRoom]] = await this.roomModel.update(room, {
      where: { roomId },
      returning: true,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    return updatedRoom;
  }

  async deleteById(roomId: string): Promise<void> {
    const deletedCount = await this.roomModel.destroy({
      where: { roomId },
    });

    if (deletedCount === 0) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }
  }

  async updatePlayerId(
    roomId: string,
    playerId: string,
    options?: TransactionOptions,
  ): Promise<Room> {
    const room = await this.findById(roomId, options);

    if (room.playerId) {
      throw new Error('Room is full (max 2 players)');
    }

    return room.update({ playerId }, { transaction: options?.transaction });
  }

  async resetPlayerId(roomId: string): Promise<Room> {
    const room = await this.findById(roomId);
    return room.update({ playerId: null });
  }
}
