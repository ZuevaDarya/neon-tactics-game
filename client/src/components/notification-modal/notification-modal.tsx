import mx from "../../mixins.module.css";
import { TNotificationModalProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Modal from "../modal/modal";
import st from "./notification-modal.module.css";

function NotificationModal({ children, onClose }: TNotificationModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={st.notification}>
        <p className={cn(st["notification__text"], mx["responsiveFont"])}>{children}</p>
      </div>
    </Modal>
  );
}

export default NotificationModal;
