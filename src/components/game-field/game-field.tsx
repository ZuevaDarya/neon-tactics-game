import { memo } from 'react';
import CARDS from "../../mocks/cards";
import Card from "../card/card";
import "./game-field.scss";

function GameField() {
  return (
    <div className="game-field">
      {CARDS.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default memo(GameField);
