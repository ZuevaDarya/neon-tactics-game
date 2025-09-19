import { useEffect } from "react";
import { createPortal } from "react-dom";
import { TModalProps } from "../../types/components-types";
import Button from "../button/button";
import ModalOverlay from "../modal-overlay/modal-overlay";
import st from "./modal.module.css";

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
      <div className={st.modal}>
        <div className={st["modal__header"]}>
          {onClose && <Button variant="closedCyan" onClick={onClose} />}
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
