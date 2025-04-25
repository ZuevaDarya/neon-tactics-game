import { CardsType } from "../constants/cards-types";

export type TCardTypes = [CardsType, CardsType];

export type TCard = {
  id: string;
  types: TCardTypes;
};

export type TCardProps = {
  card?: TCard;
};

export type TPieceTypes = "red" | "black";

export type TGamePieceBlockProps = {
  type: TPieceTypes;
}

export type TPiecePosition = "left" | "right";

export type TPlayerBlockProps = Pick<TGamePieceBlockProps, "type"> & {
  position: TPiecePosition;
};
