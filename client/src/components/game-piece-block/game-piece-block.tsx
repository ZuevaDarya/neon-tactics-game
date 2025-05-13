import { TGamePieceBlockProps } from "../../types/components-types";
import GamePiece from "../game-piece/game-piece";
import "./game-piece-block.scss";

function GamePieceBlock({ countPieces, type }: TGamePieceBlockProps) {
  return (
    <div className="game-piece-container">
      <GamePiece type={type} isDraggible={true} />
      <span>Осталось: {countPieces}</span>
    </div>
  );
}

export default GamePieceBlock;
