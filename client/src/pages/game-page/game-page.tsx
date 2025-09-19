import { useEffect } from "react";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import Header from "../../components/header/header";
import PlayerBlock from "../../components/player-block/player-block";
import WinnerModal from "../../components/winner-modal/winner-modal";
import { SessionStorageKey } from "../../constants/storage-keys";
import useActivePlayer from "../../hooks/use-active-player";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getAllPlayersInRoom, getGame, getRoom } from "../../services/thunks";
import st from "./game-page.module.css";

function GamePage() {
  const dispatch = useAppDispatch();
  const { creator, player } = useAppSelector((state) => state.players);
  const { winner } = useActivePlayer();

  useEffect(() => {
    const preloadedData = async () => {
      const roomId = sessionStorage.getItem(SessionStorageKey.RoomId);
      if (!roomId) return;

      await dispatch(getRoom({ id: roomId })).unwrap();
      await dispatch(getAllPlayersInRoom({ id: roomId })).unwrap();
      await dispatch(getGame({ id: roomId })).unwrap();
    };

    preloadedData();
  }, [dispatch]);

  return (
    <main>
      <Header />
      <div className={st["game-page-wrapper"]}>
        <GameStatePanel />
        {winner && <WinnerModal winner={winner} />}
        <div className={st["game-field-container"]}>
          {creator && <PlayerBlock player={creator} position="left" />}
          <GameField />
          {player && <PlayerBlock player={player} position="right" />}
        </div>
      </div>
    </main>
  );
}

export default GamePage;
