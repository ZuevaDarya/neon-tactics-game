import { useEffect, useMemo } from "react";
import GameControls from "../../components/game-controls/game-controls";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import PlayerBlock from "../../components/player-block/player-block";
import { BG_AUDIO_PATHS } from "../../constants/audio-paths";
import { StorageKey } from "../../constants/storage-keys";
import useActivePlayer from "../../hooks/use-active-player";
import useBackgroundMusic from "../../hooks/use-background-music";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getAllPlayersInRoom, getGame, getRoom, getTurnDuration } from "../../services/thunks";
import st from "./game-page.module.css";

function GamePage() {
  const dispatch = useAppDispatch();
  const { creator, player } = useAppSelector((state) => state.players);
  const { currentPlayerId } = useActivePlayer();
  const { isPlaying, togglePlay } = useBackgroundMusic({
    arrOfAudioPaths: BG_AUDIO_PATHS,
    volume: 0.5,
    loop: false,
  });

  useEffect(() => {
    const preloadedData = async () => {
      const roomId = sessionStorage.getItem(StorageKey.RoomId);
      if (!roomId) return;

      await dispatch(getRoom({ id: roomId })).unwrap();
      await dispatch(getAllPlayersInRoom({ id: roomId })).unwrap();
      await dispatch(getGame({ id: roomId })).unwrap();
      await dispatch(getTurnDuration()).unwrap();
    };

    preloadedData();
  }, [dispatch]);

  const leftPlayer = useMemo(
    () => (creator?.id === currentPlayerId ? creator : player),
    [creator, player, currentPlayerId]
  );

  const rightPlayer = useMemo(
    () => (creator?.id === currentPlayerId ? player : creator),
    [creator, player, currentPlayerId]
  );

  return (
    <main>
      <GameControls soundToggleProps={{ isPlaying, handleClick: togglePlay }} />
      <div className={st["game-page-wrapper"]}>
        <GameStatePanel />
        <div className={st["game-field-container"]}>
          {leftPlayer && <PlayerBlock player={leftPlayer} position="left" />}
          <GameField />
          {rightPlayer && <PlayerBlock player={rightPlayer} position="right" />}
        </div>
      </div>
    </main>
  );
}

export default GamePage;
