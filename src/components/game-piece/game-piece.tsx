import { useDrag } from "react-dnd";
import { TGamePieceBlockProps } from "../../types/components-types";
import "./game-piece.scss";

function GamePiece({ type, id }: TGamePieceBlockProps) {
  const [, drag] = useDrag({
    type: "piece",
    item: { id, type },
    collect: (monitor) => ({
      isDragged: monitor.didDrop(),
    }),
  });

  return drag(
    <div id={id} draggable className={`game-piece game-piece_${type}`} />
  );
}

export default GamePiece;
