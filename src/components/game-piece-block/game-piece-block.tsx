import { useState } from "react";
import { TGamePieceBlockProps } from "../../types/components-types";
import GamePiece from "../game-piece/game-piece";
import "./game-piece-block.scss";

function GamePieceBlock({ type }: TGamePieceBlockProps) {
  const [countPiece, ] = useState<number>(8);

  return (
    <div className="game-piece-container">
      <GamePiece type={type} />
      <span>Осталось: {countPiece}</span>
    </div>
  );
}

export default GamePieceBlock;
