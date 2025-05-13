import { useAppSelector } from "../../services/store";
import Card from "../card/card";
import "./game-state-panel.scss";

function GameStatePanel() {
  const targetCard = useAppSelector((state) => state.gameField.targetCard);
  const activePlayer = useAppSelector((state) => state.gameState.activePlayer);

  return (
    <div className="state-panel">
      {targetCard ? <Card card={targetCard} isTargetCard={true} /> : <Card />}
      <p>Ход игрока: {activePlayer && activePlayer.name}</p>
    </div>
  );
}

export default GameStatePanel;
