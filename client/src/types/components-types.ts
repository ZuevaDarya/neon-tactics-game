import React from "react";
import { FieldValues } from "react-hook-form";
import { TInputProps } from "../components/input/input";
import { CardType } from "../constants/card-types";
import { PieceType } from "../constants/piece-type";
import { TGameEndTypes, TGameFieldPiece, TPlayer } from "./services-types";

export type TCardTypes = [CardType, CardType];

export type TCard = {
  id: string;
  types: TCardTypes;
};

export type TCardProps = {
  card?: TCard;
  isTargetCard?: boolean;
  cardIdx?: number;
  onDrop?: (cardIdx: number, piece: TGameFieldPiece) => Promise<void>;
  isWinnerAnimation?: boolean;
};

export type TPieceTypes = `${PieceType}`;

export type TGamePieceProps = {
  type: TPieceTypes;
  isDraggible: boolean;
  isNonPlayed: boolean;
  isAnimated: boolean;
  isWinnerAnimation?: boolean;
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
  type: TPieceTypes | null;
  classes?: string;
};

export type TModalOverlayProps = {
  onClose?: () => void;
};

export type TModalProps = TModalOverlayProps & {
  children: React.ReactNode;
};

export type TStartModalProps = TModalOverlayProps;

export type TFormItemProps<T extends FieldValues> = TInputProps<T> & {
  label: string;
  errorMessage?: string | null;
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
  isRight?: boolean;
};

export type TProtectedRoute = {
  children: React.ReactNode;
};

export type TWinnerModalProps = Pick<TModalProps, "onClose"> & {
  winner: TPlayer | null;
  gameEndType: TGameEndTypes | null;
};

export type TNotificationModalProps = Pick<TModalProps, "onClose"> & {
  children: string;
};

export type TFormProps = {
  children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

export type TTabsProps = {
  children: React.ReactNode;
  defaultActiveTab?: number;
};

export type TTabContentProps = {
  children: React.ReactNode;
  activeTabIdx: number;
};

export type TWaitingBlockProps = {
  children?: React.ReactNode | string;
  text: string;
};

export type TWinnerModalContentProps = {
  winners: TPlayer[];
  title: string;
};

export type TCopyItem = {
  children: React.ReactNode;
};

export type TTheme = "light" | "dark";

export type TThemeContext = {
  theme: TTheme;
  toggleTheme: () => void;
};

export type TThemeProviderProps = {
  children: React.ReactNode;
};

export type TToggleWrapper = {
  children: React.ReactNode;
  handleClick: () => void;
  classes?: string;
  ariaLabel?: string;
  isOn?: boolean;
};

export type TThemeToggleProps = Pick<TToggleWrapper, "classes">;

export type THintToggleProps = Pick<TToggleWrapper, "classes">;

export type TPopupNotificationProps = {
  children: React.ReactNode | string;
  closeModal: () => void;
  isPopupOpen: boolean;
  durationS?: number;
};

export type TProgressBarProps = {
  progressPercent: number;
};
