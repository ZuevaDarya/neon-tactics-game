import { memo } from "react";
import { useDrag } from "react-dnd";
import uuid from "react-uuid";
import { SessionStorageKey } from "../../constants/storage-keys";
import useActivePlayer from "../../hooks/use-active-player";
import { TGamePieceProps } from "../../types/components-types";
import st from "./game-piece.module.css";
import cn from '../../utils/functions/cn';

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
    drag(<div className={cn(st["game-piece"], st[`game-piece--${type}`])} />)
  ) : (
    <div className={cn(st["game-piece"], st[`game-piece--${type}`])} />
  );
}

export default memo(GamePiece);
