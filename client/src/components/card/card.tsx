import { memo, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { RU_CARD_TYPES } from "../../constants/card-types";
import { LOCKED_CARDS_IDX } from "../../constants/game-constants";
import { setCardOnPiece, setTargetCard } from "../../services/slices/game-field-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TCardProps } from "../../types/components-types";
import { TGameFieldPiece } from "../../types/services-types";
import isAvailableCard from "../../utils/functions/is-available-card";
import "./card.scss";

function Card({
  card,
  isTargetCard,
  setCurrentCardIdx,
  setCurrentPieceType,
  setIsDropped,
}: TCardProps) {
  const dispatch = useAppDispatch();
  const { field, targetCard } = useAppSelector((state) => state.gameField);
  const cardIdx = field.findIndex((fieldCard) => fieldCard.id === card?.id);
  const { countTurn } = useAppSelector((state) => state.gameState);

  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const [{ isPieceMoving, item }, dropTarget] = useDrop({
    accept: "piece",
    drop(props: TGameFieldPiece) {
      dispatch(setCardOnPiece({ idx: cardIdx, piece: props }));

      if (setCurrentCardIdx) {
        setCurrentCardIdx(cardIdx);
      }

      if (card) {
        dispatch(setTargetCard(card));
      }

      if (setIsDropped) {
        setIsDropped(true);
      }
    },
    collect: (monitor) => ({
      isPieceMoving: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    if (item !== null && setCurrentPieceType) {
      setCurrentPieceType(item.type);
    }
  }, [item, setCurrentPieceType]);

  useEffect(() => {
    if (targetCard && card) {
      setIsAvailable(isAvailableCard(targetCard.types, card.types));
    }
  }, [targetCard, card]);

  useEffect(() => {
    if (countTurn === 0 && LOCKED_CARDS_IDX.includes(cardIdx)) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  }, [countTurn, cardIdx]);

  return card && !isTargetCard && !isLocked && (isAvailable || countTurn === 0) ? (
    dropTarget(
      <div className={`card ${isPieceMoving && "card_available"}`}>
        <p>{RU_CARD_TYPES[card.types[0]]}</p>
        <p>{RU_CARD_TYPES[card.types[1]]}</p>
      </div>
    )
  ) : card ? (
    <div className={`card ${isLocked && "card_locked"}`}>
      <p>{RU_CARD_TYPES[card.types[0]]}</p>
      <p>{RU_CARD_TYPES[card.types[1]]}</p>
    </div>
  ) : (
    <div className="card_empty"></div>
  );
}

export default memo(Card);
