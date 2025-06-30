import { useEffect } from "react";
import FormCreateRoom from "../../components/form-create-room/form-create-room";
import FormJoinRoom from "../../components/form-join-room/form-join-room";
import Tab from "../../components/tab/tab";
import Tabs from "../../components/tabs/tabs";
import { DEV_URL } from "../../constants/api-constants";
import { connect, disconnected } from "../../services/slices/socket-slice";
import { useAppDispatch } from "../../services/store";
import "./start-page.scss";

function StartPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect({ url: DEV_URL }));

    return () => {
      dispatch(disconnected());
    }
  }, []);

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
