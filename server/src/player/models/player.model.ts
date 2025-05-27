import { UUIDV4 } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DEFAULT_PIECE_COUNT } from 'src/constants/game-constants';
import { PieceType } from 'src/constants/piece-type';
import { TPieceType } from 'src/types/types';

@Table({
  tableName: 'player',
  timestamps: true,
  indexes: [{ fields: ['roomId'] }],
})
export class Player extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
    comment: 'Уникальный идентификатор игрока',
  })
  playerId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Имя игрока не может быть пустым' },
      len: {
        args: [3, 20],
        msg: 'Имя игрока должно быть от 3 до 20 символов',
      },
    },
    comment: 'Имя игрока',
  })
  name: string;

  @Column({
    type: DataType.STRING(8),
    allowNull: false,
    comment: 'Идентификатор комнаты',
  })
  roomId: string;

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
  })
  countPiece: number;

  @Column({
    type: DataType.ENUM(PieceType.Red, PieceType.Black),
    allowNull: false,
    comment: 'Тип фишки игрока',
  })
  pieceType: TPieceType;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Флаг активного игрока',
  })
  isActive: boolean;
}
