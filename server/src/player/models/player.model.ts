import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DEFAULT_PIECE_COUNT } from 'src/constants/game-constants';
import { PieceType } from 'src/constants/piece-type';
import { Room } from 'src/room/models/room.model';
import { TPieceType } from 'src/types/types';

@Table({
  tableName: 'player',
  timestamps: true,
  indexes: [{ fields: ['room_id'] }],
})
export class Player extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
    comment: 'Уникальный идентификатор игрока',
    field: 'id',
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Имя игрока не может быть пустым' },
      len: {
        args: [2, 12],
        msg: 'Имя игрока должно быть от 2 до 12 символов',
      },
    },
    comment: 'Имя игрока',
    field: 'name',
  })
  declare name: string;

  @ForeignKey(() => Room)
  @BelongsTo(() => Room, {
    foreignKey: 'roomId',
    targetKey: 'id',
    as: 'room',
    onDelete: 'CASCADE',
  })
  @Column({
    type: DataType.STRING(8),
    allowNull: true,
    comment: 'Идентификатор комнаты',
    field: 'room_id',
  })
  declare roomId: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: DEFAULT_PIECE_COUNT,
    validate: {
      min: { args: [0], msg: 'Количество фишек не может быть отрицательным' },
      max: {
        args: [DEFAULT_PIECE_COUNT],
        msg: 'Количество фишек не может превышать начальное значение',
      },
    },
    comment: 'Количество оставшихся фишек',
    field: 'count_piece',
  })
  declare countPiece: number;

  @Column({
    type: DataType.ENUM(PieceType.Cyan, PieceType.Pink),
    allowNull: true,
    defaultValue: null,
    comment: 'Тип фишки игрока',
    field: 'piece_type',
  })
  declare pieceType: TPieceType | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Флаг активного игрока',
    field: 'is_active',
  })
  declare isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Флаг создателя комнаты',
    field: 'is_creator',
  })
  declare isCreator: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
    comment: 'Путь к аватару игрока',
    field: 'avatar_path',
  })
  declare avatarPath: string | null;
}
