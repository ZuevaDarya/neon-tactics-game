import { useEffect } from "react";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import PlayerBlock from "../../components/player-block/player-block";
import { SessionStorageKey } from "../../constants/storage-keys";
import { addCards } from "../../services/slices/game-field-slice";
import { setActivePlayer } from "../../services/slices/game-state-slice";
import { addPlayers } from "../../services/slices/players-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";

function GamePage() {
  const dispatch = useAppDispatch();
  const [firstPlayer, secondPlayer] = useAppSelector((state) => state.players.players);

  const player1 = sessionStorage.getItem(SessionStorageKey.Player1);
  const player2 = sessionStorage.getItem(SessionStorageKey.Player2);
  const cards = sessionStorage.getItem(SessionStorageKey.Cards);
  const activePlayer = sessionStorage.getItem(SessionStorageKey.ActivePlayer);

  useEffect(() => {
    if (cards) {
      dispatch(addCards({ cards: JSON.parse(cards) }));
    }
  }, [cards, dispatch]);

  useEffect(() => {
    if (player1 && player2) {
      dispatch(addPlayers([JSON.parse(player1), JSON.parse(player2)]));
    }
  }, [player1, player2, dispatch]);

  useEffect(() => {
    if (!activePlayer) {
      if (firstPlayer && secondPlayer) {
        if (Math.random() < 0.5) {
          sessionStorage.setItem(SessionStorageKey.ActivePlayer, JSON.stringify(firstPlayer));
        } else {
          sessionStorage.setItem(SessionStorageKey.ActivePlayer, JSON.stringify(secondPlayer));
        }
      }
    } else {
      dispatch(setActivePlayer(JSON.parse(activePlayer)));
    }
  }, [firstPlayer, secondPlayer, activePlayer, dispatch]);

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
