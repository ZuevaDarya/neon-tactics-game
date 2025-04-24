import { useState } from "react";
import { TGamePieceBlockProps } from "../../types/components-types";
import GamePiece from "../game-piece/game-piece";
import "./game-piece-block.scss";

function GamePieceBlock({ type, id }: TGamePieceBlockProps) {
  const [countPiece, _setCountPiece] = useState<number>(4);

  return (
    <div className="game-piece-container">
      <GamePiece type={type} id={id} />
      <span>Осталось: {countPiece}</span>
    </div>
  );
}

export default GamePieceBlock;
