import { AppRoute } from "../../constants/app-route";
import { GameEndType } from "../../constants/game-end-type";
import { redirectPlayers } from "../../services/slices/socket-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  assignRandomPieceType,
  leaveGame,
  resetGame,
  selectActivePlayer,
  shuffleField,
} from "../../services/thunks";
import { TWinnerModalProps } from "../../types/components-types";
import Button from "../button/button";
import Modal from "../modal/modal";
import WinnerModalContent from "../winner-modal-content/winner-modal-content";
import st from "./winner-modal.module.css";

function WinnerModal({ winner, gameEndType }: TWinnerModalProps) {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);

  const handleClickPlayBtn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;

    await dispatch(resetGame({ id })).unwrap();
    await dispatch(assignRandomPieceType({ id })).unwrap();
    await dispatch(selectActivePlayer({ id })).unwrap();
    await dispatch(shuffleField({ id })).unwrap();
  };

  const handleClickExitBtn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;

    dispatch(redirectPlayers({ roomId: id, url: AppRoute.StartPage }));
    await dispatch(leaveGame({ id })).unwrap();
  };

  return (
    <Modal>
      <div className={st["winner-modal"]}>
        {winner && (gameEndType === GameEndType.Win || gameEndType === GameEndType.NoMoves) && (
          <WinnerModalContent winners={[winner, winner]} title="Победа" />
        )}
        {creator && player && gameEndType === GameEndType.Draw && (
          <WinnerModalContent winners={[creator, player]} title="Ничья" />
        )}
        <div className={st["winner-modal__buttons"]}>
          <Button type="button" variant="cyan" onClick={handleClickPlayBtn}>
            Сыграть еще раз
          </Button>
          <Button type="button" variant="pink" onClick={handleClickExitBtn}>
            Выход
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default WinnerModal;
