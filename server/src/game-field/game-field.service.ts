import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionOptions } from 'sequelize';
import { TCard } from 'src/types/types';
import generateCards from 'src/utils/functions/generate-cards';
import shuffleField from 'src/utils/functions/shuffle-field';
import { CreateGameFieldDTO } from './dto/create-game-field.dto';
import { UpdateGameFieldDTO } from './dto/update-game-field.dto';
import { GameField } from './models/game-field.model';

@Injectable()
export class GameFieldService {
  private readonly allCards = generateCards();

  constructor(
    @InjectModel(GameField) private readonly gameFieldModel: typeof GameField,
  ) {}

  private getShuffledField(): TCard[] {
    return shuffleField([...this.allCards]);
  }

  async create({ roomId }: CreateGameFieldDTO): Promise<GameField> {
    return await this.gameFieldModel.create({
      roomId,
      field: this.getShuffledField(),
    });
  }

  async findByRoomId(roomId: string): Promise<GameField> {
    const gameField = await this.gameFieldModel.findOne({
      where: { roomId },
    });

    if (!gameField) {
      throw new NotFoundException(`Game field not found`);
    }
    return gameField;
  }

  async deleteByRoomId(roomId: string): Promise<void> {
    const deletedCount = await this.gameFieldModel.destroy({
      where: { roomId },
    });

    if (deletedCount === 0) {
      throw new NotFoundException(`Room not found`);
    }
  }

  async update(
    roomId: string,
    data: UpdateGameFieldDTO,
    options?: TransactionOptions,
  ): Promise<GameField> {
    const [affectedCount, [updatedData]] = await this.gameFieldModel.update(
      data,
      {
        where: { roomId },
        returning: true,
        ...options,
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Game field with ID ${roomId} not found`);
    }

    return updatedData;
  }
}
