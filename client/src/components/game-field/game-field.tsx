import { memo, useCallback } from "react";
import uuid from "react-uuid";
import useActivePlayer from "../../hooks/use-active-player";
import useModal from "../../hooks/use-modal";
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
  const { field, error } = useAppSelector((state) => state.game);
  const { id } = useAppSelector((state) => state.room);
  const { activePlayer } = useActivePlayer();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleDrop = useCallback(
    async (cardIdx: number, piece: TGameFieldPiece) => {
      if (!activePlayer || !id) return;

      try {
        await dispatch(
          makePlayerMove({
            roomId: id,
            playerId: activePlayer.id,
            pieceIdx: cardIdx,
            piece,
          })
        ).unwrap();
        await dispatch(decrementPieceCount({ id: activePlayer.id })).unwrap();
      } catch {
        openModal();
      }
    },
    [activePlayer, id, dispatch, openModal]
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
          return <GamePiece key={uuid()} type={card.type} isDraggible={false} />;
        })}
      </div>
    </>
  );
}

export default memo(GameField);
