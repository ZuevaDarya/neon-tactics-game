import { customAlphabet } from 'nanoid';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoomStatus } from 'src/constants/room-status';
import { Player } from 'src/player/models/player.model';
import { TRoomStatus } from 'src/types/types';

const roomIdGenerator = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8);

@Table({ tableName: 'room', timestamps: true })
export class Room extends Model {
  @HasMany(() => Player, {
    foreignKey: 'roomId',
    sourceKey: 'roomId',
    as: 'players',
  })
  @Column({
    type: DataType.STRING(8),
    primaryKey: true,
    allowNull: false,
    unique: true,
    comment: 'Уникальный код комнаты',
    defaultValue: () => roomIdGenerator(),
  })
  declare roomId: string;

  @ForeignKey(() => Player)
  @BelongsTo(() => Player, {
    foreignKey: 'creatorId',
    targetKey: 'playerId',
    as: 'creator',
    constraints: false,
  })
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Идентификатор игрока - создателя комнаты',
  })
  declare creatorId: string;

  @ForeignKey(() => Player)
  @BelongsTo(() => Player, {
    foreignKey: 'playerId',
    targetKey: 'playerId',
    as: 'player',
    constraints: false,
  })
  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: 'Идентификатор игрока, присоединившегося к комнате',
  })
  declare playerId: string;

  @Column({
    type: DataType.ENUM(
      RoomStatus.Waiting,
      RoomStatus.Playing,
      RoomStatus.Finished,
    ),
    allowNull: false,
    defaultValue: 'waiting',
    comment: 'Статус комнаты: waiting, playing, finished',
  })
  declare status: TRoomStatus;

  @BeforeCreate
  static generateRoomId(instance: Room) {
    if (!instance.roomId) {
      instance.roomId = roomIdGenerator();
    }
  }
}
