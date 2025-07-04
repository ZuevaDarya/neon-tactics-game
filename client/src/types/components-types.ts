import React from "react";
import { FieldValues } from "react-hook-form";
import { TInputProps } from "../components/input/input";
import { CardType } from "../constants/card-types";
import { TPlayer } from "./services-types";

export type TCardTypes = [CardType, CardType];

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

export type TPlayerIconProps = TAvatarProps & {
  name: string;
};

export type TModalOverlayProps = {
  onClose: () => void;
};

export type TModalProps = TModalOverlayProps & {
  children: React.ReactNode;
};

export type TStartModalProps = TModalOverlayProps;

export type TFormItemProps<T extends FieldValues> = TInputProps<T> & {
  label: string;
};

export type TFormBtnProps = {
  children: React.ReactNode | string;
  type?: "button" | "reset" | "submit";
  classType: "default" | "started";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type TCloseBtnProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export type TStartForm = {
  player: string;
  roomId: string;
};

export type TAvatarProps = {
  src: string;
};

export type TProtectedRoute = {
  children: React.ReactNode;
};

export type TWinnerModalProps = Pick<TModalProps, "onClose"> & {
  winner: TPlayer;
};

export type TFormProps = {
  children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

export type TTabsProps = {
  children: React.ReactNode;
  defaultActiveTab?: number;
};

export type TTabProps = {
  isActive?: boolean;
  setActiveTabIdx?: () => void;
  idx?: number;
  children?: React.ReactNode;
  label: string;
  disabled?: boolean;
};

export type TTabContentProps = {
  children: React.ReactNode;
  activeTabIdx: number;
};
