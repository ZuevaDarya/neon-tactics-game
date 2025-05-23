import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangePlayer } from './dto/change-player.dto';
import { CreatePlayer } from './dto/create-player.dto';
import { Player } from './models/player.model';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player)
    private playersModel: typeof Player,
  ) {}

  async createPlayer(player: CreatePlayer) {
    return this.playersModel.create({ ...player });
  }

  async getPlayerById(playerId: string) {
    if (!playerId) {
      throw new Error('Player ID is required');
    }

    return this.playersModel.findOne({
      where: { playerId },
    });
  }

  async getAllPlayersInRoom(roomId: string) {
    if (!roomId) {
      throw new Error('Room ID is required');
    }

    return this.playersModel.findAll({
      where: { roomId },
    });
  }

  async updatePlayer(playerId: string, player: ChangePlayer) {
    if (!playerId) {
      throw new Error('Player ID is required');
    }

    const [affectedCount, affectedRows] = await this.playersModel.update(
      { ...player },
      {
        where: { playerId },
        returning: true,
      },
    );

    if (affectedCount === 0) {
      throw new Error('Player not found');
    }

    return affectedRows[0];
  }

  async deletePlayerById(playerId: string) {
    if (!playerId) {
      throw new Error('Player ID is required');
    }

    const player = await this.playersModel.findOne({
      where: { playerId },
    });

    if (!player) {
      throw new Error('Player not found');
    }

    await player.destroy();
    return player;
  }
}
