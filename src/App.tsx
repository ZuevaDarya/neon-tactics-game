import { useEffect } from "react";
import "./app.scss";
import GameField from "./components/game-field/game-field";
import GameStatePanel from "./components/game-state-panel/game-state-panel";
import PlayerBlock from "./components/player-block/player-block";
import CARDS from "./mocks/cards";
import { PLAYER1, PLAYER2 } from "./mocks/players";
import { addCards } from "./services/slices/game-field-slice";
import { setActivePlayer } from "./services/slices/game-state-slice";
import { addPlayers } from "./services/slices/players-slice";
import { useAppDispatch, useAppSelector } from "./services/store";
import shuffleField from "./utils/functions/shuffle-field";

function App() {
  const dispatch = useAppDispatch();
  const [firstPlayer, secondPlayer] = useAppSelector(
    (state) => state.players.players
  );

  useEffect(() => {
    dispatch(addCards({ cards: shuffleField(CARDS) }));
    dispatch(addPlayers([PLAYER1, PLAYER2]));
    dispatch(setActivePlayer(PLAYER1));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <GameStatePanel />
      <div className="game-field-container">
        {firstPlayer && <PlayerBlock player={firstPlayer} position="left" />}
        <GameField />
        {secondPlayer && <PlayerBlock player={secondPlayer} position="right" />}
      </div>
    </div>
  );
}

export default App;
