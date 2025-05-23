import { TWinnerModalProps } from "../../types/components-types";
import Button from "../button/button";
import Modal from "../modal/modal";
import PlayerIcon from "../player-icon/player-icon";
import "./winner-modal.scss";

function WinnerModal({ onClose, winner }: TWinnerModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="winner-modal">
        <h1 className="winner-modal__title">Победа!</h1>
        <PlayerIcon src={`/assets/images/j-${winner.pieceType}-1.png`} name={winner.name} />
        <div className="winner-modal__buttons">
          <Button>Сыграть еще раз</Button>
          <Button>Выход</Button>
        </div>
      </div>
    </Modal>
  );
}

export default WinnerModal;
