import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { TPieceType } from 'src/types/types';

@Table
export class Players extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, allowNull: false })
  playerId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  roomId: string;

  @Column({ defaultValue: 8, type: DataType.INTEGER, allowNull: false })
  countPiece: number;

  @Column({ type: DataType.ENUM, values: ['black', 'red'], allowNull: false })
  readonly pieceType: TPieceType;

  @Column({ defaultValue: false, type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean;
}
