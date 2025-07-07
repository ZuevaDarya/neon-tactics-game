import { useEffect } from "react";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import PlayerBlock from "../../components/player-block/player-block";
import { SessionStorageKey } from "../../constants/storage-keys";
import CARDS from "../../mocks/cards";
import { addCards } from "../../services/slices/game-field-slice";
import { setActivePlayer } from "../../services/slices/game-state-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getAllPlayersInRoom, getGameField, getRoom } from "../../services/thunks";
import shuffleField from "../../utils/functions/shuffle-field";

function GamePage() {
  const dispatch = useAppDispatch();
  const { creator, player } = useAppSelector((state) => state.players);

  useEffect(() => {
    const preloadedData = async () => {
      const roomId = sessionStorage.getItem(SessionStorageKey.RoomId);

      if (roomId) {
        await dispatch(getRoom({ id: roomId })).unwrap();
        await dispatch(getAllPlayersInRoom({ id: roomId })).unwrap();
        await dispatch(getGameField({ id: roomId })).unwrap();
      }
    };

    preloadedData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(addCards({ cards: shuffleField(CARDS) }));
  }, [dispatch]);

  useEffect(() => {
    if (creator && player) {
      if (Math.random() < 0.5) {
        dispatch(setActivePlayer(creator));
      } else {
        dispatch(setActivePlayer(player));
      }
    }
  }, [dispatch, creator, player]);

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
