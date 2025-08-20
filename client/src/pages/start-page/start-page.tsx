import FormCreateRoom from "../../components/form-create-room/form-create-room";
import FormJoinRoom from "../../components/form-join-room/form-join-room";
import Tab from "../../components/tab/tab";
import Tabs from "../../components/tabs/tabs";
import useRoomStatus from "../../hooks/use-room-status";
import mx from "../../mixins.module.css";
import cn from "../../utils/functions/cn";
import st from "./start-page.module.css";

function StartPage() {
  const { isWaiting, isPlayersJoined } = useRoomStatus();

  return (
    <div className={st["start-page-wrapper"]}>
      <h1 className={cn(st.title, st["title--upperline"], mx["responsiveFont"])}>
        NEON_TACTICS.EXE
      </h1>
      <Tabs>
        <Tab label="Создать комнату" disabled={isPlayersJoined} variant="cyan">
          <FormCreateRoom />
        </Tab>
        <Tab
          label="Присоединиться к комнате"
          disabled={isWaiting || isPlayersJoined}
          variant="pink"
        >
          <FormJoinRoom />
        </Tab>
      </Tabs>
    </div>
  );
}

export default StartPage;
