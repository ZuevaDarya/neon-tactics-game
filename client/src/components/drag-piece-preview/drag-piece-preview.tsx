import { useMemo } from "react";
import { useDragLayer } from "react-dnd";
import cn from "../../utils/functions/cn";
import isTouchDevice from "../../utils/functions/isTouchDevice";
import st from "../game-piece/game-piece.module.css";

const DragPiecePreview = () => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const isTouch = useMemo(() => isTouchDevice(), []);

  if (!isDragging || !currentOffset || itemType !== "piece" || !isTouch) {
    return null;
  }

  const { x, y } = currentOffset;

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 10000,
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <div
        className={cn(st["game-piece"], st[`game-piece--${item.type}`])}
        style={{
          transform: isTouch ? "translate(-30%, -30%)" : "none",
        }}
      />
    </div>
  );
};

export default DragPiecePreview;
