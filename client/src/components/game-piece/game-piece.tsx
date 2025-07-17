import { memo } from "react";
import { useDrag } from "react-dnd";
import uuid from "react-uuid";
import { SessionStorageKey } from "../../constants/storage-keys";
import useActivePlayer from "../../hooks/use-active-player";
import { TGamePieceProps } from "../../types/components-types";
import "./game-piece.scss";

function GamePiece({ type, isDraggible }: TGamePieceProps) {
  const { activePlayer } = useActivePlayer();

  const [, drag] = useDrag({
    type: "piece",
    item: { id: uuid(), type },
    collect: (monitor) => ({
      isDragged: monitor.didDrop(),
    }),
    canDrag: () => activePlayer?.id === sessionStorage.getItem(SessionStorageKey.PlayerId),
  });

  return activePlayer && activePlayer.pieceType === type && isDraggible ? (
    drag(<div className={`game-piece game-piece_${type}`} />)
  ) : (
    <div className={`game-piece game-piece_${type}`} />
  );
}

export default memo(GamePiece);
