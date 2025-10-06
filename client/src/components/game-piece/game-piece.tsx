import { memo } from "react";
import { useDrag } from "react-dnd";
import uuid from "react-uuid";
import { SessionStorageKey } from "../../constants/storage-keys";
import useActivePlayer from "../../hooks/use-active-player";
import { TGamePieceProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import st from "./game-piece.module.css";

function GamePiece({ type, isDraggible, isNonPlayed }: TGamePieceProps) {
  const { activePlayer, isCurrentDevicePlayer } = useActivePlayer();

  const [, drag] = useDrag({
    type: "piece",
    item: { id: uuid(), type },
    collect: (monitor) => ({
      isDragged: monitor.didDrop(),
    }),
    canDrag: isCurrentDevicePlayer,
  });

  if (!activePlayer) return null;

  const pieceElement = (
    <div
      className={cn(
        st["game-piece"],
        st[`game-piece--${type}`],
        activePlayer?.pieceType === type && isDraggible && st["game-piece--active"],
        isNonPlayed && st["game-piece--non-played"]
      )}
    />
  );

  return activePlayer.pieceType === type && isDraggible ? drag(pieceElement) : pieceElement;
}

export default memo(GamePiece);
