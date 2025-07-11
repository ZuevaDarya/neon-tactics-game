import { useEffect } from "react";
import GameField from "../../components/game-field/game-field";
import GameStatePanel from "../../components/game-state-panel/game-state-panel";
import PlayerBlock from "../../components/player-block/player-block";
import { SessionStorageKey } from "../../constants/storage-keys";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getAllPlayersInRoom, getGameField, getRoom } from "../../services/thunks";

/*
  Клиент
  TODO Менять в БД у игрока isActive, когда его ход активен
  TODO Переписать gameStateSlice

  Сервер
  TODO Написать модель, контроллер и сервис для таблицы и GameState
  TODO Написать сокет для обновления состояния поля после каждого хода игрока
  TODO Переименовать таблицы и колонки в snake_case

  ?Возможно, разделить url для сокета на странице входа и игры (url/room, url/game)

  Стили
  TODO перейтис scss на css
*/

function GamePage() {
  const dispatch = useAppDispatch();
  const { creator, player } = useAppSelector((state) => state.players);

  useEffect(() => {
    const preloadedData = async () => {
      const roomId = sessionStorage.getItem(SessionStorageKey.RoomId);

      if (roomId) {
        await dispatch(getRoom({ id: roomId })).unwrap();
        await dispatch(getAllPlayersInRoom({ id: roomId })).unwrap();
        await dispatch(getGameField({ id: roomId })).unwrap();
      }
    };

    preloadedData();
  }, [dispatch]);

  return (
    <div className="wrapper">
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
