import { memo, useCallback, useEffect } from "react";
import uuid from "react-uuid";
import useActivePlayer from "../../hooks/use-active-player";
import useModal from "../../hooks/use-modal";
import { updateAnimatePieceIdx } from "../../services/slices/game-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { decrementPieceCount, makePlayerMove } from "../../services/thunks";
import { TGameFieldPiece } from "../../types/services-types";
import translateError from "../../utils/functions/translate-error";
import Card from "../card/card";
import GamePiece from "../game-piece/game-piece";
import NotificationModal from "../notification-modal/notification-modal";
import st from "./game-field.module.css";

function GameField() {
  const dispatch = useAppDispatch();
  const { field, error, animatePieceIdx } = useAppSelector((state) => state.game);
  const { id } = useAppSelector((state) => state.room);
  const { currentPlayerId } = useActivePlayer();
  const { isModalOpen, openModal, closeModal } = useModal();

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

  return (
    <>
      {isModalOpen && error && (
        <NotificationModal onClose={closeModal}>{translateError(error)}</NotificationModal>
      )}
      <div className={st["game-field"]}>
        {field.map((card, idx) => {
          if ("types" in card) {
            return <Card key={card.id} card={card} cardIdx={idx} onDrop={handleDrop} />;
          }

          console.log(idx === animatePieceIdx, animatePieceIdx);
          return (
            <GamePiece
              key={uuid()}
              type={card.type}
              isDraggible={false}
              isNonPlayed={false}
              isAnimated={idx === animatePieceIdx}
            />
          );
        })}
      </div>
    </>
  );
}

export default memo(GameField);
