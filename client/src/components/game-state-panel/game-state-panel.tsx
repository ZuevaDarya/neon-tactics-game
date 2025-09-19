import useActivePlayer from "../../hooks/use-active-player";
import mx from "../../mixins.module.css";
import { useAppSelector } from "../../services/store";
import cn from "../../utils/functions/cn";
import Card from "../card/card";
import st from "./game-state-panel.module.css";

function GameStatePanel() {
  const targetCard = useAppSelector((state) => state.game.targetCard);
  const { activePlayer } = useActivePlayer();

  return (
    <div className={cn(st["state-panel"])}>
      {targetCard ? <Card card={targetCard} isTargetCard={true} /> : <Card />}
      <p className={cn(st.text, mx["responsiveFont"])}>
        Ход:
        <span
          className={cn(
            st["name"],
            activePlayer && st[`name--${activePlayer.pieceType}`],
            st["text__name"]
          )}
        >
          {activePlayer?.name}
        </span>
      </p>
    </div>
  );
}

export default GameStatePanel;
