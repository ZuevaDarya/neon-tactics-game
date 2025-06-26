import FormCreateRoom from "../../components/form-create-room/form-create-room";
import FormJoinRoom from "../../components/form-join-room/form-join-room";
import Tab from "../../components/tab/tab";
import Tabs from "../../components/tabs/tabs";
import useSocket from "../../hooks/use-socket";
import "./start-page.scss";

function StartPage() {
  useSocket();

  return (
    <div className="container">
      <h1 className="game-title">Okiya Game</h1>
      <Tabs>
        <Tab label="Создать комнату">
          <FormCreateRoom />
        </Tab>
        <Tab label="Присоединиться к комнате">
          <FormJoinRoom />
        </Tab>
      </Tabs>
    </div>
  );
}

export default StartPage;
