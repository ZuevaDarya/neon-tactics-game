import { CardType } from 'src/constants/card-types';
import { PieceType } from 'src/constants/piece-type';
import { RoomStatus } from 'src/constants/room-status';
import { SocketEvent } from 'src/constants/socket-event';
import { Game } from 'src/game/models/game.model';
import { CreatePlayerDTO } from 'src/player/dto/create-player.dto';
import { Player } from 'src/player/models/player.model';
import { Room } from 'src/room/models/room.model';

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

export type TCardTypes = [`${CardType}`, `${CardType}`];

export type TCard = {
  id: string;
  types: TCardTypes;
};

export type TPieceTypes = `${PieceType}`;

export type TGameFieldPiece = {
  id: string;
  type: TPieceTypes;
};

export type TGameFiled = (TCard | TGameFieldPiece)[];

export type TResetRameResponse = {
  players: Player[];
  room: Room;
  game: Game;
};
