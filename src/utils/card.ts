import { CardsType } from "../constants/cards-types";

class Card {
  public id: string;
  public type: [CardsType, CardsType];

  constructor(id: string, type: [CardsType, CardsType]) {
    this.id = id;
    this.type = type;
  }
}

export default Card;
