import useActivePlayer from "../../hooks/use-active-player";
import { useAppSelector } from "../../services/store";
import Card from "../card/card";
import "./game-state-panel.scss";

function GameStatePanel() {
  const targetCard = useAppSelector((state) => state.game.targetCard);
  const { activePlayer } = useActivePlayer();

  return (
    <div className="state-panel">
      {targetCard ? <Card card={targetCard} isTargetCard={true} /> : <Card />}
      <p>Ход игрока: {activePlayer?.name}</p>
    </div>
  );
}

export default GameStatePanel;
