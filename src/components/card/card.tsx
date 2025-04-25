import { memo, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { RU_CARDS_TYPES } from "../../constants/cards-types";
import {
  setCardOnPiece,
  setTargetCard,
} from "../../services/slices/game-field-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TCardProps, TGamePieceBlockProps } from "../../types/components-types";
import isAvailableCard from "../../utils/functions/is-available-card";
import "./card.scss";

function Card({ card }: TCardProps) {
  const dispatch = useAppDispatch();
  const { field, targetCard } = useAppSelector((state) => state.gameField);
  const cardIdx = field.findIndex(
    (fieldCard) => "id" in fieldCard && fieldCard.id === card?.id
  );
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const [{ isPieceMoving }, dropTarget] = useDrop({
    accept: "piece",
    drop(props: TGamePieceBlockProps) {
      dispatch(setCardOnPiece({ idx: cardIdx, piece: props }));

      if (card) {
        dispatch(setTargetCard(card));
      }
    },
    collect: (monitor) => ({
      isPieceMoving: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (targetCard && card) {
      setIsAvailable(isAvailableCard(targetCard.types, card.types));
    }
  }, [targetCard, card]);

  return card ? (
    dropTarget(
      <div className={`card ${isAvailable && isPieceMoving && "card_available"}`}>
        <p>{RU_CARDS_TYPES[card.types[0]]}</p>
        <p>{RU_CARDS_TYPES[card.types[1]]}</p>
      </div>
    )
  ) : (
    <div className="card_empty"></div>
  );
}

export default memo(Card);
