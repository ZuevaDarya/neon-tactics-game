import { CardsType } from "../constants/cards-types";
import { TPlayer } from './services-types';

export type TCardTypes = [CardsType, CardsType];

export type TCard = {
  id: string;
  types: TCardTypes;
};

export type TCardProps = {
  card?: TCard;
  isTargetCard?: boolean;
};

export type TPieceTypes = "red" | "black";

export type TGamePieceProps = {
  type: TPieceTypes;
  isDraggible: boolean;
};

export type TGamePieceBlockProps = TGamePieceProps & {
  countPieces: number;
};

export type TPiecePosition = "left" | "right";

export type TPlayerBlockProps = {
  player: TPlayer;
  position: TPiecePosition;
};

export type TPlayerIconProps = {
  name: string;
};
