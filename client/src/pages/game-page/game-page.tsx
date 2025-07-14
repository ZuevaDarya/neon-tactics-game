import { useEffect } from "react";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import PlayerBlock from "../../components/player-block/player-block";
import { DEV_URL } from "../../constants/api-constants";
import { SessionStorageKey } from "../../constants/storage-keys";
import { connect, disconnected } from "../../services/slices/socket-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getAllPlayersInRoom, getGame, getRoom } from "../../services/thunks";

function GamePage() {
  const dispatch = useAppDispatch();
  const { creator, player } = useAppSelector((state) => state.players);

  useEffect(() => {
    const preloadedData = async () => {
      const roomId = sessionStorage.getItem(SessionStorageKey.RoomId);

      if (roomId) {
        await dispatch(getRoom({ id: roomId })).unwrap();
        await dispatch(getAllPlayersInRoom({ id: roomId })).unwrap();
        await dispatch(getGame({ id: roomId })).unwrap();
      }
    };

    preloadedData();
  }, [dispatch]);

  return (
    <div className="wrapper">
      <GameStatePanel />
      <div className="game-field-container">
        {creator && <PlayerBlock player={creator} position="left" />}
        <GameField />
        {player && <PlayerBlock player={player} position="right" />}
      </div>
    </div>
  );
}

export default GamePage;
