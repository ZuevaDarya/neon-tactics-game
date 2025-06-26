import { PieceType } from 'src/constants/piece-type';
import { RoomStatus } from 'src/constants/room-status';
import { SocketEvent } from 'src/constants/socket-event';
import { CreatePlayerDTO } from 'src/player/dto/create-player.dto';

export type TPieceType = `${PieceType}`;

export type TRoomStatus = `${RoomStatus}`;

export type TDatabaseConfigAttributes = {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  logging?: boolean;
  autoLoadEntities?: boolean;
  synchronize?: boolean;
};

export type TDatabaseConfig = {
  development: TDatabaseConfigAttributes;
  test: TDatabaseConfigAttributes;
  production: TDatabaseConfigAttributes;
};

export type TCreatePlayerWithJoinInRoom = {
  roomId: string;
  playerData: CreatePlayerDTO;
};

export type TSocketEvent = `${SocketEvent}`;

export type TGetCountPieceResponse = {
  playerId: string;
  countPiece: number;
};
