import { TCard, TGamePieceProps, TPieceTypes } from "./components-types";

export type TGameFieldPiece = Pick<TGamePieceProps, "type"> & {
  id: string;
};

export type TGameFiledState = {
  field: (TCard | TGameFieldPiece)[];
  targetCard: TCard | null;
};

export type TAddCardsAction = {
  cards: TCard[];
};

export type TPreloadedState = {
  gameField: TGameFiledState;
  gameState: TGameState;
  players: TPlayersState;
};

export type TSetCardOnPieceAction = {
  idx: number;
  piece: TGameFieldPiece;
};

export type TPlayer = {
  id: string;
  name: string;
  countPieces: number;
  pieceType: TPieceTypes;
};

export type TGameState = {
  countTurn: number;
  activePlayer: TPlayer | null;
  winner: TPlayer | null;
};

export type TPlayersState = {
  players: [TPlayer, TPlayer] | [];
};
