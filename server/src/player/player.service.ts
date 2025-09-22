import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionOptions } from 'sequelize';
import { AvatarService } from 'src/utils/services/avatar.service';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { UpdatePlayerDTO } from './dto/update-player.dto';
import { Player } from './models/player.model';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player)
    private readonly playerModel: typeof Player,
    @Inject(forwardRef(() => AvatarService))
    private readonly avatarService: AvatarService,
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

  async findById(id: string, options?: TransactionOptions): Promise<Player> {
    const player = await this.playerModel.findByPk(id, options);

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  async getAllInRoom(
    roomId: string,
    options?: TransactionOptions,
  ): Promise<Player[]> {
    return this.playerModel.findAll({
      where: { roomId },
      order: [['createdAt', 'ASC']],
      ...options,
    });
  }

  async update(
    id: string,
    player: UpdatePlayerDTO,
    options?: TransactionOptions,
  ): Promise<Player> {
    const [affectedCount, [updatedPlayer]] = await this.playerModel.update(
      player,
      {
        where: { id },
        returning: true,
        ...options,
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return updatedPlayer;
  }

  async deleteById(id: string, options?: TransactionOptions): Promise<Player> {
    const player = await this.findById(id, options);

    if (player.avatarPath && player.roomId) {
      const avatarName = this.avatarService.getAvatarNameFromPath(
        player.avatarPath,
      );

      if (avatarName) {
        this.avatarService.removeAvatarFromRoom(player.roomId, avatarName);
      }
    }

    await player.destroy(options);
    return player;
  }

  async changeActiveStatus(
    id: string,
    isActive: boolean,
    options?: TransactionOptions,
  ): Promise<Player> {
    return this.update(id, { isActive }, options);
  }

  async decrementPieceCount(
    id: string,
    options?: TransactionOptions,
  ): Promise<Player> {
    const player = await this.findById(id, options);

    if (player.countPiece <= 0) {
      throw new Error('Piece count cannot be negative');
    }

    return await this.update(
      id,
      { countPiece: player.countPiece - 1 },
      { ...options },
    );
  }

  async assignAvatarToPlayer(
    playerId: string,
    roomId: string,
    options?: TransactionOptions,
  ): Promise<Player> {
    const avatarPath = this.avatarService.getUniqueAvatarPathForRoom(roomId);

    if (!avatarPath) {
      throw new Error('No available avatars in room');
    }

    return await this.update(playerId, { avatarPath }, { ...options });
  }
}
