import { JSONB } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Room } from 'src/room/models/room.model';
import { TCard, TGameFiled } from 'src/types/types';

@Table({
  tableName: 'game_field',
  timestamps: true,
  indexes: [{ fields: ['roomId'] }],
})
export class GameField extends Model {
  @ForeignKey(() => Room)
  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    targetKey: 'roomId',
    as: 'room',
  })
  @Column({
    type: DataType.STRING(8),
    primaryKey: true,
    allowNull: false,
    comment: 'Идентификатор комнаты',
  })
  declare roomId: string;

  @Column({
    type: JSONB,
    allowNull: false,
    comment: 'Массив карточек игрового поля',
  })
  declare field: TGameFiled;

  @Column({
    type: JSONB,
    allowNull: true,
    defaultValue: null,
    comment: 'Активная карточка',
  })
  declare targetCard: null | TCard;
}
