import uuid from "react-uuid";
import { CardType } from "../constants/card-types";
import { TCard } from "../types/components-types";

const CARDS: TCard[] = [
  {
    id: uuid(),
    types: [CardType.Maple, CardType.Sun],
  },
  {
    id: uuid(),
    types: [CardType.Maple, CardType.Paper],
  },
  {
    id: uuid(),
    types: [CardType.Maple, CardType.Bird],
  },
  {
    id: uuid(),
    types: [CardType.Maple, CardType.Rain],
  },
  {
    id: uuid(),
    types: [CardType.Sakura, CardType.Sun],
  },
  {
    id: uuid(),
    types: [CardType.Sakura, CardType.Paper],
  },
  {
    id: uuid(),
    types: [CardType.Sakura, CardType.Bird],
  },
  {
    id: uuid(),
    types: [CardType.Sakura, CardType.Rain],
  },
  {
    id: uuid(),
    types: [CardType.Pine, CardType.Sun],
  },
  {
    id: uuid(),
    types: [CardType.Pine, CardType.Paper],
  },
  {
    id: uuid(),
    types: [CardType.Pine, CardType.Bird],
  },
  {
    id: uuid(),
    types: [CardType.Pine, CardType.Rain],
  },
  {
    id: uuid(),
    types: [CardType.Iris, CardType.Sun],
  },
  {
    id: uuid(),
    types: [CardType.Iris, CardType.Paper],
  },
  {
    id: uuid(),
    types: [CardType.Iris, CardType.Bird],
  },
  {
    id: uuid(),
    types: [CardType.Iris, CardType.Rain],
  },
];

export default CARDS;
