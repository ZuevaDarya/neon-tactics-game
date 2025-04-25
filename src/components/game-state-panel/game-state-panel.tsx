import { useAppSelector } from "../../services/store";
import Card from "../card/card";
import "./game-state-panel.scss";

function GameStatePanel() {
  const targetCard = useAppSelector((state) => state.gameField.targetCard);

  return (
    <div className="state-panel">
      {targetCard ? <Card card={targetCard} /> : <Card />}
      <p>Ход игрока: Player</p>
    </div>
  );
}

export default GameStatePanel;
