import { memo, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { RU_CARDS_TYPES } from "../../constants/cards-types";
import { LOCKED_CARDS_IDX } from "../../constants/game-constants";
import {
  setCardOnPiece,
  setTargetCard,
} from "../../services/slices/game-field-slice";
import {
  increaseCountTurn,
  setActivePlayer,
} from "../../services/slices/game-state-slice";
import { updatePlayer } from "../../services/slices/players-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TCardProps, TGamePieceBlockProps } from "../../types/components-types";
import isAvailableCard from "../../utils/functions/is-available-card";
import "./card.scss";

function Card({ card, isTargetCard }: TCardProps) {
  const dispatch = useAppDispatch();
  const { field, targetCard } = useAppSelector((state) => state.gameField);
  const cardIdx = field.findIndex(
    (fieldCard) => "id" in fieldCard && fieldCard.id === card?.id
  );
  const players = useAppSelector((state) => state.players.players);
  const { activePlayer, countTurn } = useAppSelector((state) => state.gameState);

  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const [{ isPieceMoving }, dropTarget] = useDrop({
    accept: "piece",
    drop(props: TGamePieceBlockProps) {
      dispatch(setCardOnPiece({ idx: cardIdx, piece: props }));

      if (card) {
        dispatch(setTargetCard(card));
      }

      if (activePlayer) {
        const nextTurnPlayer = players.find(
          (player) => player.id !== activePlayer.id
        );

        if (nextTurnPlayer) {
          dispatch(setActivePlayer(nextTurnPlayer));
          dispatch(
            updatePlayer({
              ...activePlayer,
              countPieces: activePlayer.countPieces - 1,
            })
          );
          dispatch(increaseCountTurn());
        }
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
        <p>{RU_CARDS_TYPES[card.types[0]]}</p>
        <p>{RU_CARDS_TYPES[card.types[1]]}</p>
      </div>
    )
  ) : card ? (
    <div className={`card ${isLocked && "card_locked"}`}>
      <p>{RU_CARDS_TYPES[card.types[0]]}</p>
      <p>{RU_CARDS_TYPES[card.types[1]]}</p>
    </div>
  ) : (
    <div className="card_empty"></div>
  );
}

export default memo(Card);
