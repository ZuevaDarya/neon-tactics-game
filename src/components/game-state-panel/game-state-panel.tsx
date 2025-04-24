import Card from "../card/card";
import "./game-state-panel.scss";

function GameStatePanel() {
  return (
    <div className="state-panel">
      <Card />
      <p>Ход игрока: Player</p>
    </div>
  );
}

export default GameStatePanel;
