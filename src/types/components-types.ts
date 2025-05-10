import { UseFormRegister } from 'react-hook-form';
import { CardsType } from "../constants/cards-types";
import { TPlayer } from "./services-types";
import { InputName } from '../constants/input-name';

export type TCardTypes = [CardsType, CardsType];

export type TCard = {
  id: string;
  types: TCardTypes;
};

export type TCardProps = {
  card?: TCard;
  isTargetCard?: boolean;
  setCurrentCardIdx?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPieceType?: React.Dispatch<React.SetStateAction<TPieceTypes | null>>;
  setIsDropped?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TPieceTypes = "red" | "black";

export type TGamePieceProps = {
  type: TPieceTypes;
  isDraggible: boolean;
};

export type TGamePieceBlockProps = Pick<TGamePieceProps, "type"> & {
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

export type TModalOverlayProps = {
  onClose: () => void;
};

export type TModalProps = TModalOverlayProps & {
  children: React.ReactNode;
};

export type TStartModalProps = TModalOverlayProps;

export type TFormItemProps = {
  label: string;
  name: InputName;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  register: UseFormRegister<TStartForm>;
  readonly?: boolean;
  required?: boolean;
};

export type TFormSectionProps = {
  title: string;
  children: React.ReactNode;
};

export type TFormBtnProps = {
  children: React.ReactNode | string;
  type?: "button" | "reset" | "submit";
  classType: "default" | "started";
};

export type TCloseBtnProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type TStartForm = {
  player1: string;
  player2: string;
};
