import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import "./game-piece.scss";

export type TGamePiece = {
  type: "red" | "black";
  id: string;
};

function GamePiece({ type, id }: TGamePiece) {
  const [countPiece, setCountPiece] = useState<number>(4);
  const [collected, drag] = useDrag({
    type: "piece",
    item: { id, type },
    collect: (monitor) => ({
      isDragged: monitor.didDrop(),
    }),
  });

  useEffect(() => {
    if (collected.isDragged && countPiece > 0) {
      setCountPiece((prev) => prev - 1);
    }
  }, [collected.isDragged, countPiece]);

  return (
    <div className="game-piece-container">
      {drag(
        <div id={id} draggable className={`game-piece game-piece_${type}`} />
      )}
      <span>Осталось: {countPiece}</span>
    </div>
  );
}

export default GamePiece;
