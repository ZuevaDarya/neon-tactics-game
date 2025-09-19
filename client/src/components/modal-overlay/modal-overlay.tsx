import { TModalOverlayProps } from "../../types/components-types";
import st from "./modal-overlay.module.css";

function ModalOverlay({ onClose }: TModalOverlayProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!onClose) return;

    e.stopPropagation();
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return <div className={st["modal-overlay"]} onClick={handleClick} />;
}

export default ModalOverlay;
