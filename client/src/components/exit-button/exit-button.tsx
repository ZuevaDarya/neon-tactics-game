import { AppRoute } from "../../constants/app-route";
import { redirectPlayers } from "../../services/slices/socket-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { leaveGame } from "../../services/thunks";
import Button from "../button/button";

function ExitButton() {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.room);

  const handleClickExitBtn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) return;

    dispatch(redirectPlayers({ roomId: id, url: AppRoute.StartPage }));
    await dispatch(leaveGame({ id })).unwrap();
  };

  return (
    <Button type="button" variant="pink" onClick={handleClickExitBtn}>
      Выход
    </Button>
  );
}

export default ExitButton;
