import { memo, useCallback, useEffect, useMemo } from "react";
import useActivePlayer from "../../hooks/use-active-player";
import useGameEndAnimation from "../../hooks/use-game-end-animation";
import useModal from "../../hooks/use-modal";
import { updateAnimatePieceIdx } from "../../services/slices/game-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { decrementPieceCount, makePlayerMove } from "../../services/thunks";
import { TGameFieldPiece } from "../../types/services-types";
import cn from "../../utils/functions/cn";
import translateError from "../../utils/functions/translate-error";
import Card from "../card/card";
import GamePiece from "../game-piece/game-piece";
import NotificationModal from "../notification-modal/notification-modal";
import WinnerModal from "../winner-modal/winner-modal";
import st from "./game-field.module.css";

function GameField() {
  const dispatch = useAppDispatch();
  const { field, error, animatePieceIdx, endType } = useAppSelector((state) => state.game);
  const { id } = useAppSelector((state) => state.room);
  const { currentPlayerId, winner } = useActivePlayer();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { isAnimationStart, isWinnerModalOpen } = useGameEndAnimation({
    durationMs: 1900,
  });

  useEffect(() => {
    if (animatePieceIdx !== null) {
      const timer = setTimeout(() => {
        dispatch(updateAnimatePieceIdx(null));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [animatePieceIdx, dispatch]);

  const handleDrop = useCallback(
    async (cardIdx: number, piece: TGameFieldPiece) => {
      if (!currentPlayerId || !id) return;

      try {
        await dispatch(
          makePlayerMove({
            roomId: id,
            playerId: currentPlayerId,
            pieceIdx: cardIdx,
            piece,
          })
        ).unwrap();
        await dispatch(decrementPieceCount({ id: currentPlayerId })).unwrap();
      } catch {
        openModal();
        dispatch(updateAnimatePieceIdx(null));
      }
    },
    [currentPlayerId, id, dispatch, openModal]
  );

  const fieldElements = useMemo(() => {
    return field.map((card, idx) => {
      if ("types" in card) {
        return (
          <Card
            key={card.id}
            card={card}
            cardIdx={idx}
            onDrop={handleDrop}
            isWinnerAnimation={isAnimationStart}
          />
        );
      }
      return (
        <GamePiece
          key={`piece-${card.type}-${idx}`}
          type={card.type}
          isDraggible={false}
          isNonPlayed={false}
          isAnimated={idx === animatePieceIdx}
          isWinnerAnimation={isAnimationStart}
        />
      );
    });
  }, [field, isAnimationStart, animatePieceIdx, handleDrop]);

  return (
    <>
      {isWinnerModalOpen && <WinnerModal winner={winner} gameEndType={endType} />}
      {isModalOpen && !isWinnerModalOpen && error && (
        <NotificationModal onClose={closeModal}>{translateError(error)}</NotificationModal>
      )}
      <div className={cn(st["game-field"], isAnimationStart && st["game-field--animated"])}>
        {fieldElements}
      </div>
    </>
  );
}

export default memo(GameField);
