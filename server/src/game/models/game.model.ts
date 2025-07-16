import { JSONB } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Player } from 'src/player/models/player.model';
import { Room } from 'src/room/models/room.model';
import { TCard, TGameFiled } from 'src/types/types';

@Table({
  tableName: 'game',
  timestamps: true,
  indexes: [{ fields: ['room_id'] }],
})
export class Game extends Model {
  @ForeignKey(() => Room)
  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    targetKey: 'id',
    as: 'room',
    onDelete: 'CASCADE',
  })
  @Column({
    type: DataType.STRING(8),
    primaryKey: true,
    allowNull: false,
    comment: 'Идентификатор комнаты',
    field: 'room_id',
  })
  declare roomId: string;

  @Column({
    type: JSONB,
    allowNull: false,
    defaultValue: [],
    comment: 'Массив карточек игрового поля',
    field: 'field',
  })
  declare field: TGameFiled;

  @Column({
    type: JSONB,
    allowNull: true,
    defaultValue: null,
    comment: 'Активная карточка',
    field: 'target_card',
  })
  declare targetCard: null | TCard;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Количество совершенных ходов в партии',
    field: 'count_turn',
  })
  declare countTurn: number;

  @ForeignKey(() => Player)
  @BelongsTo(() => Player, {
    foreignKey: 'winnerId',
    targetKey: 'id',
    as: 'winner',
    constraints: false,
  })
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
    comment: 'Идентификатор победившего игрока',
    field: 'winner_id',
  })
  declare winnerId: string;
}
