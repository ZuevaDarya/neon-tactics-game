import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionOptions } from 'sequelize';
import { TCard } from 'src/types/types';
import generateCards from 'src/utils/functions/generate-cards';
import shuffleField from 'src/utils/functions/shuffle-field';
import { CreateGameDTO } from './dto/create-game.dto';
import { UpdateGameDTO } from './dto/update-game.dto';
import { Game } from './models/game.model';

@Injectable()
export class GameService {
  private readonly allCards = generateCards();

  constructor(@InjectModel(Game) private readonly gameModel: typeof Game) {}

  private getShuffledField(): TCard[] {
    return shuffleField([...this.allCards]);
  }

  async create({ roomId }: CreateGameDTO): Promise<Game> {
    return await this.gameModel.create({
      roomId,
      field: this.getShuffledField(),
    });
  }

  async findByRoomId(roomId: string): Promise<Game> {
    const gameData = await this.gameModel.findOne({
      where: { roomId },
    });

    if (!gameData) {
      throw new NotFoundException(`Game not found`);
    }
    return gameData;
  }

  async deleteByRoomId(roomId: string): Promise<void> {
    const deletedCount = await this.gameModel.destroy({
      where: { roomId },
    });

    if (deletedCount === 0) {
      throw new NotFoundException(`Game not found`);
    }
  }

  async update(
    roomId: string,
    data: UpdateGameDTO,
    options?: TransactionOptions,
  ): Promise<Game> {
    const [affectedCount, [updatedData]] = await this.gameModel.update(data, {
      where: { roomId },
      returning: true,
      ...options,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(`Game field with ID ${roomId} not found`);
    }

    return updatedData;
  }

  async incrementCountTurn(roomId: string): Promise<Game> {
    const state = await this.findByRoomId(roomId);
    return await this.update(roomId, { countTurn: state.countTurn + 1 });
  }
}
