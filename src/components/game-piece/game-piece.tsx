import { useDrag } from "react-dnd";
import { TGamePieceBlockProps } from "../../types/components-types";
import "./game-piece.scss";

function GamePiece({ type }: TGamePieceBlockProps) {
  const [, drag] = useDrag({
    type: "piece",
    item: { type },
    collect: (monitor) => ({
      isDragged: monitor.didDrop(),
    }),
  });

  return drag(
    <div draggable className={`game-piece game-piece_${type}`} />
  );
}

export default GamePiece;
