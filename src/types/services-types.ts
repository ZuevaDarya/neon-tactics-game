import { TCard, TGamePieceBlockProps } from "./components-types";

export type TGameFiledState = {
  field: (TCard | TGamePieceBlockProps)[];
  targetCard: TCard | null;
};

export type TAddCardsAction = {
  cards: TCard[];
};

export type TPreloadedState = {
  gameField: TGameFiledState;
};

export type TSetCardOnPieceAction = {
  idx: number;
  piece: TGamePieceBlockProps;
};
