import { JSONB, UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Room } from 'src/room/models/room.model';
import { TCard } from 'src/types/types';

@Table({
  tableName: 'game_field',
  timestamps: true,
  indexes: [{ fields: ['id', 'roomId'] }],
})
export class GameField extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
    comment: 'Уникальный идентификатор игрового поля',
  })
  declare id: string;

  @ForeignKey(() => Room)
  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    targetKey: 'roomId',
    as: 'room',
  })
  @Column({
    type: DataType.STRING(8),
    allowNull: false,
    comment: 'Идентификатор комнаты',
  })
  declare roomId: string;

  @Column({
    type: JSONB,
    allowNull: false,
    comment: 'Массив карточек игрового поля',
  })
  declare field: TCard[];

  @Column({
    type: JSONB,
    allowNull: true,
    defaultValue: null,
    comment: 'Активная карточка',
  })
  declare targetCard: null | TCard;
}
