import { AppRoute } from "../../constants/app-route";
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
import PlayerIcon from "../player-icon/player-icon";
import "./winner-modal.scss";

function WinnerModal({ winner }: TWinnerModalProps) {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.room);

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
      <div className="winner-modal">
        <h1 className="winner-modal__title">Победа!</h1>
        <PlayerIcon src={`/assets/images/j-${winner.pieceType}-1.png`} name={winner.name} />
        <div className="winner-modal__buttons">
          <Button type="button" variant="started" onClick={handleClickPlayBtn}>
            Сыграть еще раз
          </Button>
          <Button type="button" variant="default" onClick={handleClickExitBtn}>
            Выход
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default WinnerModal;
