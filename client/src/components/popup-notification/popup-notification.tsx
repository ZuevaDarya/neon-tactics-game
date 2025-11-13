import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import useTimer from "../../hooks/use-timer";
import mx from "../../mixins.module.css";
import { TPopupNotificationProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Button from "../button/button";
import Progressbar from "../progressbar/progressbar";
import st from "./popup-notification.module.css";

const modalRoot = document.getElementById("modals") as HTMLElement;

function PopupNotification({
  children,
  closeModal,
  isPopupOpen,
  durationS = 2,
}: TPopupNotificationProps) {
  const { start, progress, reset, isCompleted, pause, resume } = useTimer({ durationS });
  const progressPercent = useMemo(() => progress * 100, [progress]);

  useEffect(() => {
    if (isPopupOpen) {
      reset();
      start();
    } else {
      reset();
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (isCompleted) {
      closeModal();
    }
  }, [isCompleted, closeModal]);

  return createPortal(
    <div
      className={cn(
        st["notification"],
        isPopupOpen && st["notification--animated-enter"],
      )}
      role="status"
      aria-live="polite"
      aria-describedby="notification-message"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <Button
        className={st["notification__button"]}
        variant="closedNotificationCyan"
        aria-label="Закрыть уведомление"
        onClick={closeModal}
      />
      <p id="notification-message" className={cn(st["notification__text"], mx["responsiveFont"])}>
        {children}
      </p>
      <Progressbar progressPercent={progressPercent} />
    </div>,
    modalRoot
  );
}

export default PopupNotification;
