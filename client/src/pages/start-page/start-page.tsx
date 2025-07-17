import FormCreateRoom from "../../components/form-create-room/form-create-room";
import FormJoinRoom from "../../components/form-join-room/form-join-room";
import Tab from "../../components/tab/tab";
import Tabs from "../../components/tabs/tabs";
import useRoomStatus from "../../hooks/use-room-status";
import "./start-page.scss";

function StartPage() {
  const { isWaiting, isPlayersJoined } = useRoomStatus();

  return (
    <div className="container">
      <h1 className="game-title">Okiya Game</h1>
      <Tabs>
        <Tab label="Создать комнату" disabled={isPlayersJoined}>
          <FormCreateRoom />
        </Tab>
        <Tab label="Присоединиться к комнате" disabled={isWaiting || isPlayersJoined}>
          <FormJoinRoom />
        </Tab>
      </Tabs>
    </div>
  );
}

export default StartPage;
