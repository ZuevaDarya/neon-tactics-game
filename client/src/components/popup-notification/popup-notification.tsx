import { useEffect } from "react";
import { createPortal } from "react-dom";
import { SOUND_EFFECTS_PATHS } from "../../constants/audio-paths";
import useProgress from "../../hooks/use-progress";
import useSoundEffect from "../../hooks/use-sound-effect";
import mx from "../../mixins.module.css";
import { TPopupNotificationProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Button from "../button/button";
import Progressbar from "../progressbar/progressbar";
import st from "./popup-notification.module.css";

const notificationRoot = document.getElementById("notification") as HTMLElement;

function PopupNotification({
  children,
  closeModal,
  isPopupOpen,
  durationS = 2,
}: TPopupNotificationProps) {
  const { start, progressPercent, reset, isCompleted, pause, resume } = useProgress({ durationS });
  const { play, stop } = useSoundEffect({
    pathToAudio: SOUND_EFFECTS_PATHS.notificationEcho,
  });

  useEffect(() => {
    const audioPlay = async () => await play();

    if (isPopupOpen) {
      reset();
      start();
      audioPlay();
    } else {
      reset();
      stop();
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (isCompleted) {
      closeModal();
      stop();
    }
  }, [isCompleted, closeModal, stop]);

  return createPortal(
    <div
      className={cn(st["notification"], isPopupOpen && st["notification--animated-enter"])}
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
    notificationRoot
  );
}

export default PopupNotification;
