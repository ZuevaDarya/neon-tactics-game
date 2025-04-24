import { memo } from "react";
import { useAppSelector } from "../../services/store";
import Card from "../card/card";
import GamePiece from "../game-piece/game-piece";
import "./game-field.scss";

function GameField() {
  const field = useAppSelector((state) => state.gameField.field);

  return (
    <div className="game-field">
      {field.map((card) => {
        if ("types" in card) {
          return <Card key={card.id} card={card} />;
        }
        return <GamePiece id={card.id} type={card.type} />;
      })}
    </div>
  );
}

export default memo(GameField);
