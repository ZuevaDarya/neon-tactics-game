import "./app.scss";
import GameField from "./components/game-field/game-field";
import GameStatePanel from "./components/game-state-panel/game-state-panel";
import PlayerBlock from "./components/player-block/player-block";

function App() {
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
