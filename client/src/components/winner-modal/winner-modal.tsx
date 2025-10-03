import { GameEndType } from "../../constants/game-end-type";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { playAgain } from "../../services/thunks";
import { TWinnerModalProps } from "../../types/components-types";
import Button from "../button/button";
import ExitButton from "../exit-button/exit-button";
import Modal from "../modal/modal";
import WinnerModalContent from "../winner-modal-content/winner-modal-content";
import st from "./winner-modal.module.css";

function WinnerModal({ winner, gameEndType }: TWinnerModalProps) {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);

  const handleClickPlayAgainBtn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;
    await dispatch(playAgain({ id })).unwrap();
  };

  return (
    <Modal>
      <div className={st["winner-modal"]}>
        {winner && gameEndType !== GameEndType.Draw && gameEndType !== null && (
          <WinnerModalContent winners={[winner]} title="Победа" />
        )}
        {creator && player && gameEndType === GameEndType.Draw && (
          <WinnerModalContent winners={[creator, player]} title="Ничья" />
        )}
        <div className={st["winner-modal__buttons"]}>
          <Button type="button" variant="cyan" onClick={handleClickPlayAgainBtn}>
            Сыграть еще раз
          </Button>
          <ExitButton />
        </div>
      </div>
    </Modal>
  );
}

export default WinnerModal;
