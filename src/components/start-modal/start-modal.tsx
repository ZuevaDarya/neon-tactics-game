import { TStartModalProps } from "../../types/components-types";
import FormBtn from "../form-btn/form-btn";
import FormItem from "../form-item/form-item";
import FormSection from "../form-section/form-section";
import Modal from "../modal/modal";
import "./start-modal.scss";

function StartModal({ onClose }: TStartModalProps) {
  return (
    <Modal onClose={onClose}>
      <form className="form">
        <FormSection title="Введите игроков">
          <div className="items-block items-block_ds-row">
            <FormItem
              label="Игрок 1"
              name="player1"
              placeholder="игрок 1"
              type="text"
            />
            <FormItem
              label="Игрок 2"
              name="player2"
              placeholder="игрок 2"
              type="text"
            />
          </div>
        </FormSection>

        <FormBtn type="submit" classType="started">
          Начать игру
        </FormBtn>
      </form>
    </Modal>
  );
}

export default StartModal;
