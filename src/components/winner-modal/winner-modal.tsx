import { TWinnerModalProps } from "../../types/components-types";
import FormBtn from "../form-btn/form-btn";
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
          <FormBtn classType="default">Сыграть еще раз</FormBtn>
          <FormBtn classType="default">Выход</FormBtn>
        </div>
      </div>
    </Modal>
  );
}

export default WinnerModal;
