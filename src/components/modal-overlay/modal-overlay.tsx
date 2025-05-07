import { TModalOverlayProps } from "../../types/components-types";
import "./modal-overlay.scss";

function ModalOverlay({ onClose }: TModalOverlayProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return <div className="modal-overlay" onClick={handleClick} />;
}

export default ModalOverlay;
