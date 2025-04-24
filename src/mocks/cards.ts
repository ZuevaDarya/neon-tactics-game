import uuid from "react-uuid";
import { CardsType } from "../constants/cards-types";

type T = {
  id: string;
  types: [CardsType, CardsType];
}

const CARDS: T[] = [
  {
    id: uuid(),
    types: [CardsType.Maple, CardsType.Sun],
  },
  {
    id: uuid(),
    types: [CardsType.Maple, CardsType.Paper],
  },
  {
    id: uuid(),
    types: [CardsType.Maple, CardsType.Bird],
  },
  {
    id: uuid(),
    types: [CardsType.Maple, CardsType.Rain],
  },
  {
    id: uuid(),
    types: [CardsType.Sakura, CardsType.Sun],
  },
  {
    id: uuid(),
    types: [CardsType.Sakura, CardsType.Paper],
  },
  {
    id: uuid(),
    types: [CardsType.Sakura, CardsType.Bird],
  },
  {
    id: uuid(),
    types: [CardsType.Sakura, CardsType.Rain],
  },
  {
    id: uuid(),
    types: [CardsType.Pine, CardsType.Sun],
  },
  {
    id: uuid(),
    types: [CardsType.Pine, CardsType.Paper],
  },
  {
    id: uuid(),
    types: [CardsType.Pine, CardsType.Bird],
  },
  {
    id: uuid(),
    types: [CardsType.Pine, CardsType.Rain],
  },
  {
    id: uuid(),
    types: [CardsType.Iris, CardsType.Sun],
  },
  {
    id: uuid(),
    types: [CardsType.Iris, CardsType.Paper],
  },
  {
    id: uuid(),
    types: [CardsType.Iris, CardsType.Bird],
  },
  {
    id: uuid(),
    types: [CardsType.Iris, CardsType.Rain],
  },
];

export default CARDS;
