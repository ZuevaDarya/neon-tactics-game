import { useEffect } from 'react';
import "./app.scss";
import GameField from "./components/game-field/game-field";
import GameStatePanel from "./components/game-state-panel/game-state-panel";
import PlayerBlock from "./components/player-block/player-block";
import CARDS from './mocks/cards';
import { addCards } from './services/slices/game-field-slice';
import { useAppDispatch } from './services/store';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addCards({ cards: CARDS }));
  }, [dispatch]);
  
  return (
    <div className="wrapper">
      <GameStatePanel />
      <div className="game-field-container">
        <PlayerBlock type="black" position="left" />
        <GameField />
        <PlayerBlock type="red" position="right" />
      </div>
    </div>
  );
}

export default App;
