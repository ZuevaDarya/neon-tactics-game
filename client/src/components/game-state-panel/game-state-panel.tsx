import { useAppSelector } from "../../services/store";
import Card from "../card/card";
import "./game-state-panel.scss";

function GameStatePanel() {
  const targetCard = useAppSelector((state) => state.game.targetCard);
  const { creator, player } = useAppSelector((state) => state.players);

  return (
    <div className="state-panel">
      {targetCard ? <Card card={targetCard} isTargetCard={true} /> : <Card />}
      <p>Ход игрока: {creator?.isAcive ? creator?.name : player?.name}</p>
    </div>
  );
}

export default GameStatePanel;
