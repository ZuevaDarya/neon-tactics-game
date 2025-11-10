import { memo } from "react";
import { useDrag } from "react-dnd";
import uuid from "react-uuid";
import useActivePlayer from "../../hooks/use-active-player";
import { TGamePieceProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import gameFieldSt from "../game-field/game-field.module.css";
import st from "./game-piece.module.css";

function GamePiece({
  type,
  isDraggible,
  isNonPlayed,
  isAnimated,
  isWinnerAnimation,
}: TGamePieceProps) {
  const { activePlayer, isCurrentDevicePlayer, winner } = useActivePlayer();

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
        !isWinnerAnimation &&
          activePlayer?.pieceType === type &&
          isDraggible &&
          st["game-piece--active"],
        isNonPlayed && st["game-piece--non-played"],
        !isWinnerAnimation && isAnimated && st["game-piece--animated"],
        isWinnerAnimation && winner?.pieceType === type && gameFieldSt["game-end-animated"]
      )}
    />
  );

  return activePlayer.pieceType === type && isDraggible ? drag(pieceElement) : pieceElement;
}

export default memo(GamePiece);
