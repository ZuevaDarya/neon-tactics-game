import { API_PATHS } from "../constants/api-constants";
import { RoomStatus } from "../constants/room-status";
import { TCard, TGamePieceProps, TPieceTypes } from "./components-types";

export type TGameFieldPiece = Pick<TGamePieceProps, "type"> & {
  id: string;
};

export type TGame = {
  field: (TCard | TGameFieldPiece)[];
  targetCard: TCard | null;
  countTurn: number;
  winnerId: string | null;
};

export type TGameState = TGame & TThunkState;

export type TPreloadedState = {
  game: TGameState;
  players: TPlayersState;
  room: TRoomState;
  socket: TSocketState;
};

export type TPlayer = {
  id: string;
  name: string;
  countPiece: number;
  pieceType: TPieceTypes | null;
  roomId: string | null;
  isActive: boolean;
  isCreator: boolean;
  avatarPath: string | null;
};

export type TPlayersState = {
  creator: TPlayer | null;
  player: TPlayer | null;
} & TThunkState;

export type TRoomStatus = `${RoomStatus}`;

export type TRoomBase = {
  id: string;
  creatorId: string;
  playerId: string | null;
  status: TRoomStatus;
};

export type TRoomState = {
  [k in keyof TRoomBase]: TRoomBase[k] | null;
} & TThunkState;

export type TApiPaths = (typeof API_PATHS)[keyof typeof API_PATHS];

export type TRoomResponse = TRoomBase;

export type TThunkState = {
  isRequest: boolean;
  isSuccess: boolean;
  error: string | null;
};

export type TCreatePlayer = {
  name: string;
};

export type TPlayerWithRoomResponse = {
  player: TPlayer;
  room: TRoomResponse;
};

export type TCreatePlayerWithJoinInRoom = {
  name: string;
  roomId: string;
};

export type TRejectValue = {
  rejectValue: string;
};

export type TSocketState = {
  isConnected: boolean;
  error: string | null;
  socketId: string | null;
};

export type TUpdateRoomStatus = {
  id: string;
  status: TRoomStatus;
};

export type TCreateGameResponse = TGame & {
  id: string;
};

export type TUpdateGameResponse = TCreateGameResponse;

export type TUpdateGame = Pick<TUpdateGameResponse, "id"> & {
  [k in keyof Omit<TUpdateGameResponse, "id">]?: TUpdateGameResponse[k];
};

export type TBasePlayerParam = Pick<TPlayer, "id">;

export type TBaseRoomParam = Pick<TRoomResponse, "id">;

export type TChangeActiveStatus = Pick<TPlayer, "id" | "isActive">;

export type TResetRameResponse = {
  players: TPlayer[];
  room: TRoomBase;
  game: TCreateGameResponse;
};

export type TUpdateFieldElement = {
  roomId: string;
  playerId: string;
  pieceIdx: number;
  piece: TGameFieldPiece;
};
