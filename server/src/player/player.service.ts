import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionOptions } from 'sequelize';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { Player } from './models/player.model';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player)
    private readonly playerModel: typeof Player,
  ) {}

  async create(
    player: CreatePlayerDTO,
    options?: TransactionOptions,
  ): Promise<Player> {
    return this.playerModel.create(
      { ...player },
      { returning: true, ...options },
    );
  }

  async findById(playerId: string): Promise<Player> {
    const player = await this.playerModel.findByPk(playerId);

    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    return player;
  }

  async getAllInRoom(roomId: string): Promise<Player[]> {
    return this.playerModel.findAll({
      where: { roomId },
      order: [['createdAt', 'ASC']],
    });
  }

  async update(
    playerId: string,
    player: UpdatePlayerDTO,
    options?: TransactionOptions,
  ): Promise<Player> {
    const [affectedCount, [updatedPlayer]] = await this.playerModel.update(
      player,
      {
        where: { playerId },
        returning: true,
        ...options,
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

    return updatedPlayer;
  }

  async deleteById(playerId: string): Promise<void> {
    const deletedCount = await this.playerModel.destroy({
      where: { playerId },
    });

    if (deletedCount === 0) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }
  }

  async changeActiveStatus(
    playerId: string,
    isActive: boolean,
  ): Promise<Player> {
    return this.update(playerId, { isActive });
  }

  async getPieceCount(playerId: string): Promise<number> {
    const player = await this.findById(playerId);
    return player.countPiece;
  }

  async decrementPieceCount(playerId: string): Promise<number> {
    const player = await this.findById(playerId);

    if (player.countPiece <= 0) {
      throw new Error('Piece count cannot be negative');
    }

    player.countPiece -= 1;
    await player.save();

    return player.countPiece;
  }
}
