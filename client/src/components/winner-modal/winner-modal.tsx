import { GameEndType } from "../../constants/game-end-type";
import useActivePlayer from "../../hooks/use-active-player";
import mx from "../../mixins.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { playAgain } from "../../services/thunks";
import { TWinnerModalProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Button from "../button/button";
import ExitButton from "../exit-button/exit-button";
import Modal from "../modal/modal";
import WinnerModalContent from "../winner-modal-content/winner-modal-content";
import st from "./winner-modal.module.css";

function WinnerModal({ winner, gameEndType }: TWinnerModalProps) {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.room);
  const { creator, player } = useAppSelector((state) => state.players);
  const { currentPlayerId } = useActivePlayer();

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
          {currentPlayerId === creator?.id ? (
            <Button type="button" variant="cyan" onClick={handleClickPlayAgainBtn}>
              Сыграть еще раз
            </Button>
          ) : (
            <span className={cn(st["winner-modal__text"], mx["responsiveFont"])}>
              Дождитесь, пока создатель комнаты {creator?.name} не начнет игру
            </span>
          )}
          <ExitButton />
        </div>
      </div>
    </Modal>
  );
}

export default WinnerModal;
