import FormCreateRoom from "../../components/form-create-room/form-create-room";
import FormJoinRoom from "../../components/form-join-room/form-join-room";
import Tab from "../../components/tab/tab";
import Tabs from "../../components/tabs/tabs";
import "./start-page.scss";

function StartPage() {
  // const dispatch = useAppDispatch();
  // const { roomId, creatorId } = useAppSelector((state) => state.room);

  // useEffect(() => {
  //   if (roomId && creatorId) {
  //     sessionStorage.setItem(SessionStorageKey.PlayerId, creatorId);
  //     sessionStorage.setItem(SessionStorageKey.RoomId, roomId);
  //   }
  // }, [roomId, creatorId]);

  // useEffect(() => {
  //   const playerId = sessionStorage.getItem(SessionStorageKey.PlayerId);
  //   const roomId = sessionStorage.getItem(SessionStorageKey.RoomId);

  //   if (playerId && roomId) {
  //     dispatch(getPlayer({ id: playerId })).unwrap();
  //     dispatch(getRoom({ id: roomId })).unwrap();
  //   }
  // }, [dispatch]);

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
