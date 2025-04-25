import { memo } from "react";
import { useDrop } from "react-dnd";
import { RU_CARDS_TYPES } from "../../constants/cards-types";
import { setCardOnPiece, setTargetCard } from "../../services/slices/game-field-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TCardProps, TGamePieceBlockProps } from "../../types/components-types";
import "./card.scss";

function Card({ card }: TCardProps) {
  const dispatch = useAppDispatch();
  const field = useAppSelector((state) => state.gameField.field);
  const cardIdx = field.findIndex(
    (fieldCard) => "id" in fieldCard && fieldCard.id === card?.id
  );

  const [, dropTarget] = useDrop<TGamePieceBlockProps>({
    accept: "piece",
    drop(props) {
      dispatch(setCardOnPiece({ idx: cardIdx, piece: props }));

      if (card) {
        dispatch(setTargetCard(card));
      }
    },
    collect: (monitor) => ({
      isDroped: monitor.didDrop(),
    }),
  });

  return card ? (
    dropTarget(
      <div className="card">
        <p>{RU_CARDS_TYPES[card.types[0]]}</p>
        <p>{RU_CARDS_TYPES[card.types[1]]}</p>
      </div>
    )
  ) : (
    <div className="card_empty"></div>
  );
}

export default memo(Card);
