import { useEffect } from "react";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import PlayerBlock from "../../components/player-block/player-block";
import WinnerModal from "../../components/winner-modal/winner-modal";
import { SessionStorageKey } from "../../constants/storage-keys";
import useActivePlayer from "../../hooks/use-active-player";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getAllPlayersInRoom, getGame, getRoom } from "../../services/thunks";

/*
  Клиент
  TODO Написать protectedRoute, в котором проерять все данные и только после этого редеректить
  TODO Добавить шапку с кнопкой "Покинуть игру", "начать заново"
  TODO Выводить количество ходов в раунде countTurn
  TODO Добавить таблицу с комнатами, где только один игрок

  Сервер
  TODO Сделать проверку activePlayer === player, чтобы нельзя было перетаскивать чужие фишки
  TODO Перенести логику с игрой и проверку ходов на сервер
  TODO Доработать проверку победителя (если ничья или игрок не может сделать ход)
  TODO Добавить возможность присоединиться к комнате в таблице с комнатами

  Стили
  TODO перейти с scss на css
*/

function GamePage() {
  const dispatch = useAppDispatch();
  const { creator, player } = useAppSelector((state) => state.players);
  const { winner } = useActivePlayer();

  useEffect(() => {
    const preloadedData = async () => {
      const roomId = sessionStorage.getItem(SessionStorageKey.RoomId);
      if (!roomId) return;

      await dispatch(getRoom({ id: roomId })).unwrap();
      await dispatch(getAllPlayersInRoom({ id: roomId })).unwrap();
      await dispatch(getGame({ id: roomId })).unwrap();
    };

    preloadedData();
  }, [dispatch]);

  return (
    <div className="wrapper">
      {winner && <WinnerModal winner={winner} />}
      <GameStatePanel />
      <div className="game-field-container">
        {creator && <PlayerBlock player={creator} position="left" />}
        <GameField />
        {player && <PlayerBlock player={player} position="right" />}
      </div>
    </div>
  );
}

export default GamePage;
