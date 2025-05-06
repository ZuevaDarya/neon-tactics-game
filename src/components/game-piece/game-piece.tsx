import { useDrag } from "react-dnd";
import uuid from "react-uuid";
import { useAppSelector } from "../../services/store";
import { TGamePieceProps } from "../../types/components-types";
import "./game-piece.scss";
import { memo } from 'react';

function GamePiece({ type, isDraggible }: TGamePieceProps) {
  const activePlayer = useAppSelector((state) => state.gameState.activePlayer);

  const [, drag] = useDrag({
    type: "piece",
    item: { id: uuid(), type },
    collect: (monitor) => ({
      isDragged: monitor.didDrop(),
    }),
  });

  return activePlayer && activePlayer.pieceType === type && isDraggible ? (
    drag(<div className={`game-piece game-piece_${type}`} />)
  ) : (
    <div className={`game-piece game-piece_${type}`} />
  );
}

export default memo(GamePiece);
