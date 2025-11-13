import { useEffect } from "react";
import FormCreateRoom from "../../components/form-create-room/form-create-room";
import FormJoinRoom from "../../components/form-join-room/form-join-room";
import Tab from "../../components/tab/tab";
import Tabs from "../../components/tabs/tabs";
import ThemeToggle from "../../components/theme-toggle/theme-toggle";
import { StorageKey } from "../../constants/storage-keys";
import useRoomStatus from "../../hooks/use-room-status";
import mx from "../../mixins.module.css";
import cn from "../../utils/functions/cn";
import st from "./start-page.module.css";

function StartPage() {
  const { isWaiting, isPlayersJoined } = useRoomStatus();

  useEffect(() => {
    sessionStorage.setItem(StorageKey.HasAnimationPlayed, String(false));
    sessionStorage.setItem(StorageKey.IsWinnerModalOpen, String(false));
    sessionStorage.setItem(StorageKey.IsHintOn, String(false));
  }, []);

  return (
    <>
      <ThemeToggle classes={st["start-page__theme-toggle"]} />
      <main className={st["start-page-wrapper"]}>
        <h1
          className={cn(
            st.title,
            st["title--upperline"],
            mx["responsiveFont"],
            st["typing-effect"]
          )}
        >
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
      </main>
    </>
  );
}

export default StartPage;
