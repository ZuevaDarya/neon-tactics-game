import useActivePlayer from "../../hooks/use-active-player";
import useModal from "../../hooks/use-modal";

import useProgress from "../../hooks/use-progress";
import useTurnTimer from "../../hooks/use-turn-timer";
import mx from "../../mixins.module.css";
import { useAppSelector } from "../../services/store";
import cn from "../../utils/functions/cn";
import Card from "../card/card";
import PopupNotification from "../popup-notification/popup-notification";
import Progressbar from "../progressbar/progressbar";
import st from "./game-state-panel.module.css";

function GameStatePanel() {
  const { targetCard, timeToTurn, turnDuration } = useAppSelector((state) => state.game);
  const { activePlayer, isCurrentDevicePlayer } = useActivePlayer();
  const { isModalOpen, openModal, closeModal } = useModal();

  const { remainingMs, remainingFormatted } = useTurnTimer({
    serverDeadline: timeToTurn || undefined,
    onExpired: () => {
      console.log("Время вышло, делаем ход");
      openModal();
    },
  });

  const { progressPercent } = useProgress({
    durationS: turnDuration ?? 0,
    mode: "sync",
    remainingMs,
  });

  return (
    <>
      {isCurrentDevicePlayer && (
        <PopupNotification closeModal={closeModal} isPopupOpen={isModalOpen}>
          Время вышло! Делаем автоматический ход...
        </PopupNotification>
      )}

      <div className={cn(st["state-panel"])}>
        <div className={st["state-panel__game-info"]}>
          {targetCard ? <Card card={targetCard} isTargetCard={true} /> : <Card />}
          <p className={cn(st.text, mx["responsiveFont"])}>
            Ход:
            <span
              className={cn(
                st["name"],
                activePlayer && st[`name--${activePlayer.pieceType}`],
                st["text__name"]
              )}
            >
              {activePlayer?.name}
            </span>
          </p>
        </div>
        <div className={st["state-panel__progress-info"]}>
          <span className={cn(st.text, st["text__time"], mx["responsiveFont"])}>
            {timeToTurn ? remainingFormatted : ""}
          </span>
          <Progressbar progressPercent={progressPercent} mode="sync" />
        </div>
      </div>
    </>
  );
}

export default GameStatePanel;
