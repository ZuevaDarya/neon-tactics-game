import uuid from "react-uuid";
import useActivePlayer from "../../hooks/use-active-player";
import useModal from "../../hooks/use-modal";

import useProgress from "../../hooks/use-progress";
import useTurnTimer from "../../hooks/use-turn-timer";
import mx from "../../mixins.module.css";
import { makeRandomMove } from "../../services/slices/socket-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TPieceTypes } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Card from "../card/card";
import PopupNotification from "../popup-notification/popup-notification";
import Progressbar from "../progressbar/progressbar";
import st from "./game-state-panel.module.css";

function GameStatePanel() {
  const dispatch = useAppDispatch();
  const { targetCard, timeToTurn, turnDuration, endType } = useAppSelector((state) => state.game);
  const { id } = useAppSelector((state) => state.room);
  const { activePlayer, isCurrentDevicePlayer, currentPlayerId } = useActivePlayer();
  const { isModalOpen, openModal, closeModal } = useModal();

  const { remainingMs, remainingFormatted } = useTurnTimer({
    serverDeadline: timeToTurn || undefined,
    onExpired: () => {
      if (id && activePlayer && currentPlayerId === activePlayer.id) {
        const moveData = {
          roomId: id,
          data: {
            playerId: activePlayer.id,
            piece: {
              id: uuid(),
              type: activePlayer.pieceType as TPieceTypes,
            },
          },
        };

        dispatch(makeRandomMove(moveData));
        openModal();
      }
    },
  });

  const { progressPercent } = useProgress({
    durationS: turnDuration ?? 0,
    mode: "sync",
    remainingMs,
  });

  return (
    <>
      {isCurrentDevicePlayer && !endType && (
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
            {timeToTurn && !endType ? remainingFormatted : "00:00"}
          </span>
          <Progressbar progressPercent={!endType ? progressPercent : 0} mode="sync" />
        </div>
      </div>
    </>
  );
}

export default GameStatePanel;
