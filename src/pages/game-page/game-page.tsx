import { useEffect } from "react";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import PlayerBlock from "../../components/player-block/player-block";
import CARDS from "../../mocks/cards";
import { addCards } from "../../services/slices/game-field-slice";
import { setActivePlayer } from "../../services/slices/game-state-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import shuffleField from "../../utils/functions/shuffle-field";

function GamePage() {
  const dispatch = useAppDispatch();
  const [firstPlayer, secondPlayer] = useAppSelector(
    (state) => state.players.players
  );

  useEffect(() => {
    dispatch(addCards({ cards: shuffleField(CARDS) }));
  }, [dispatch]);

  useEffect(() => {
    if (firstPlayer && secondPlayer) {
      if (Math.random() < 0.5) {
        dispatch(setActivePlayer(firstPlayer));
      } else {
        dispatch(setActivePlayer(secondPlayer));
      }
    }
  }, []);

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

export default GamePage;
