import { useEffect } from "react";
import { createPortal } from "react-dom";
import { TModalProps } from "../../types/components-types";
import CloseBtn from "../close-btn/close-btn";
import ModalOverlay from "../modal-overlay/modal-overlay";
import "./modal.scss";

const modalRoot = document.getElementById("modals") as HTMLElement;

function Modal({ children, onClose }: TModalProps) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!onClose) return;

      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className="modal">
        <div className="modal__header">{onClose && <CloseBtn onClick={onClose} />}</div>
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
