import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { RU_CARD_TYPES } from "../../constants/card-types";
import { LOCKED_CARDS_IDX } from "../../constants/game-constants";
import { useAppSelector } from "../../services/store";
import { TCardProps } from "../../types/components-types";
import { TGameFieldPiece } from "../../types/services-types";
import isAvailableCard from "../../utils/functions/is-available-card";
import "./card.scss";

function Card({ card, isTargetCard, cardIdx = -1, onDrop }: TCardProps) {
  const { targetCard, countTurn } = useAppSelector((state) => state.game);

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

  if (!card) return <div className="card_empty" />;
  if (isTargetCard || isLocked || !(isAvailable || countTurn === 0)) {
    return <div className={`card ${isLocked ? "card_locked" : ""}`}>{renderCardContent()}</div>;
  }

  return dropTarget(
    <div className={`card ${isPieceMoving ? "card_available" : ""}`}>{renderCardContent()}</div>
  );
}

export default Card;
