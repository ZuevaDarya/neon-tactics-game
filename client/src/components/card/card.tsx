import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { RU_CARD_TYPES } from "../../constants/card-types";
import { LOCKED_CARDS_IDX } from "../../constants/game-constants";
import useActivePlayer from "../../hooks/use-active-player";
import { useAppSelector } from "../../services/store";
import { TCardProps } from "../../types/components-types";
import { TGameFieldPiece } from "../../types/services-types";
import cn from "../../utils/functions/cn";
import isAvailableCard from "../../utils/functions/is-available-card";
import st from "./card.module.css";

function Card({ card, isTargetCard, cardIdx = -1, onDrop }: TCardProps) {
  const { targetCard, countTurn } = useAppSelector((state) => state.game);
  const { isCurrentDevicePlayer } = useActivePlayer();

  const isAvailable = useMemo(
    () => (targetCard && card ? isAvailableCard(targetCard.types, card.types) : false),
    [card, targetCard]
  );

  const isLocked = useMemo(
    () => cardIdx >= 0 && countTurn === 0 && LOCKED_CARDS_IDX.includes(cardIdx),
    [countTurn, cardIdx]
  );

  const [{ isPieceMoving }, dropTarget] = useDrop({
    accept: "piece",
    drop: (piece: TGameFieldPiece) => {
      if (onDrop && cardIdx >= 0) {
        onDrop(cardIdx, piece);
      }
    },
    collect: (monitor) => ({
      isPieceMoving: monitor.canDrop(),
    }),
  });

  const renderCardContent = () => (
    <>
      <p>{card?.types[0] ? RU_CARD_TYPES[card.types[0]] : ""}</p>
      <p>{card?.types[1] ? RU_CARD_TYPES[card.types[1]] : ""}</p>
    </>
  );

  if (!card) return <div className={cn(st.card, st["card--empty"])} />;
  if (isTargetCard || isLocked || !(isAvailable || countTurn === 0)) {
    return (
      <div
        className={cn(
          st.card,
          isLocked && st["card--locked"],
          isTargetCard && st["card--targeted"]
        )}
      >
        {renderCardContent()}
      </div>
    );
  }

  return dropTarget(
    <div className={cn(st.card, (isPieceMoving || isCurrentDevicePlayer) && st["card--available"])}>
      {renderCardContent()}
    </div>
  );
}

export default Card;
