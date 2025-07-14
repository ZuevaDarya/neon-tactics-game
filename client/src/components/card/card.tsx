import { memo, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { RU_CARD_TYPES } from "../../constants/card-types";
import { LOCKED_CARDS_IDX } from "../../constants/game-constants";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  changeActiveStatus,
  decrementPieceCount,
  incrementCountTurn,
  updateGame,
} from "../../services/thunks";
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
  const { field, targetCard, countTurn } = useAppSelector((state) => state.game);
  const cardIdx = field.findIndex((fieldCard) => fieldCard.id === card?.id);
  const { roomId } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);

  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const [{ isPieceMoving, item }, dropTarget] = useDrop({
    accept: "piece",
    drop(props: TGameFieldPiece) {
      if (setCurrentCardIdx) {
        setCurrentCardIdx(cardIdx);
      }

      if (card && roomId) {
        const copyField = [...field];
        copyField[cardIdx] = props;

        dispatch(updateGame({ roomId, field: copyField, targetCard: card }));
        dispatch(incrementCountTurn({ id: roomId }));
      }

      if (creator && player) {
        const activePlayer = creator?.isAcive ? creator : player;

        dispatch(decrementPieceCount({ id: activePlayer.playerId }));
        dispatch(changeActiveStatus({ id: activePlayer.playerId, isActive: false }));
        dispatch(
          changeActiveStatus({
            id: player.playerId !== activePlayer.playerId ? player.playerId : creator.playerId,
            isActive: true,
          })
        );
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
