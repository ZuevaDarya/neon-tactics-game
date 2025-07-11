import { API_PATHS } from "../constants/api-constants";
import { RoomStatus } from "../constants/room-status";
import { TCard, TGamePieceProps, TPieceTypes } from "./components-types";

export type TGameFieldPiece = Pick<TGamePieceProps, "type"> & {
  id: string;
};

export type TGameFiledState = {
  field: (TCard | TGameFieldPiece)[];
  targetCard: TCard | null;
} & TThunkState;

export type TAddCardsAction = {
  cards: TCard[];
};

export type TPreloadedState = {
  gameField: TGameFiledState;
  gameState: TGameState;
  players: TPlayersState;
  room: TRoomState;
  socket: TSocketState;
};

export type TSetCardOnPieceAction = {
  idx: number;
  piece: TGameFieldPiece;
};

export type TPlayer = {
  playerId: string;
  name: string;
  countPiece: number;
  pieceType: TPieceTypes | null;
  roomId: string | null;
  isAcive: boolean;
  isCreator: boolean;
};

export type TGameState = {
  countTurn: number;
  activePlayer: TPlayer | null;
  winner: TPlayer | null;
};

export type TPlayersState = {
  creator: TPlayer | null;
  player: TPlayer | null;
} & TThunkState;

export type TRoomStatus = `${RoomStatus}`;

export type TRoomBase = {
  roomId: string;
  creatorId: string;
  playerId: string | null;
  status: TRoomStatus;
};

export type TRoomState = {
  [k in keyof TRoomBase]: TRoomBase[k] | null;
} & TThunkState;

export type TApiPaths = (typeof API_PATHS)[keyof typeof API_PATHS];

export type TCreateRoom = {
  creatorId: string;
};

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

export type TGetCountPieceResponse = {
  playerId: string;
  countPiece: number;
};

export type TRejectValue = {
  rejectValue: string;
};

export type TSocketState = {
  isConnected: boolean;
  error: string | null;
  socketId: string | null;
};

export type TGetAllPlayersInRoomResponse = {
  players: TPlayer[];
};

export type TUpdateRoomStatus = {
  id: string;
  status: TRoomStatus;
};

export type TCreateFieldResponse = TGameFiledState & {
  roomId: string;
};

export type TAssignPieceTypeResponse = [TPlayer, TPlayer];

export type TAssignPieceType = {
  player1Id: string;
  player2Id: string;
  roomId: string;
};

export type TSelectActivePlayerResponse = {
  player: TPlayer;
};

export type TSelectActivePlayer = TAssignPieceType;

export type TUpdateGameFieldResponse = Pick<TGameFiledState, "field" | "targetCard"> & {
  roomId: string;
};

export type TUpdateGameField = {
  [k in keyof TUpdateGameFieldResponse]?: TUpdateGameFieldResponse[k];
};
