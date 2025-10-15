import uuid from "react-uuid";
import { CardType } from "../constants/card-types";
import { TCard } from "../types/components-types";

const CARDS: TCard[] = [
  {
    id: uuid(),
    types: [CardType.Hacker, CardType.QrCode],
  },
  {
    id: uuid(),
    types: [CardType.Hacker, CardType.Gun],
  },
  {
    id: uuid(),
    types: [CardType.Hacker, CardType.Flask],
  },
  {
    id: uuid(),
    types: [CardType.Hacker, CardType.Hologram],
  },
  {
    id: uuid(),
    types: [CardType.Robot, CardType.QrCode],
  },
  {
    id: uuid(),
    types: [CardType.Robot, CardType.Gun],
  },
  {
    id: uuid(),
    types: [CardType.Robot, CardType.Flask],
  },
  {
    id: uuid(),
    types: [CardType.Robot, CardType.Hologram],
  },
  {
    id: uuid(),
    types: [CardType.Vr, CardType.QrCode],
  },
  {
    id: uuid(),
    types: [CardType.Vr, CardType.Gun],
  },
  {
    id: uuid(),
    types: [CardType.Vr, CardType.Flask],
  },
  {
    id: uuid(),
    types: [CardType.Vr, CardType.Hologram],
  },
  {
    id: uuid(),
    types: [CardType.Chip, CardType.QrCode],
  },
  {
    id: uuid(),
    types: [CardType.Chip, CardType.Gun],
  },
  {
    id: uuid(),
    types: [CardType.Chip, CardType.Flask],
  },
  {
    id: uuid(),
    types: [CardType.Chip, CardType.Hologram],
  },
];

export default CARDS;
