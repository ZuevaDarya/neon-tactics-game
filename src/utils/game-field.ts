import { TCard, TGamePieceBlockProps } from "../types/components-types";
import Card from "./card";

/*
  создать map
  key = i in arr
  value = {
    card: {id, types: []}
    position: [x, y]
  }
*/

class GameField {
  public field = new Map<number, Card | TGamePieceBlockProps>();

  constructor(cards: TCard[]) {
    this.fillMap(cards);
  }

  private fillMap(cards: TCard[]) {
    cards.map((card, idx) =>
      this.field.set(idx, new Card(card.id, card.types))
    );
  }

  public setCard(idx: number, piece: TGamePieceBlockProps) {
    this.field.set(idx, piece);
  }
}

export default GameField;
