import { TCard, TGamePieceBlockProps, TPieceTypes } from "./components-types";

export type TGameFiledState = {
  field: (TCard | TGamePieceBlockProps)[];
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
  piece: TGamePieceBlockProps;
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
};

export type TPlayersState = {
  players: [TPlayer, TPlayer] | [];
};


