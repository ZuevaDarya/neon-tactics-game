import { SessionStorageKey } from "../../constants/storage-keys";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { assignWinner } from "../../services/thunks";
import Button from "../button/button";
import ExitButton from "../exit-button/exit-button";
import st from "./game-controls.module.css";

function GameControls() {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.room);
  const playerId = sessionStorage.getItem(SessionStorageKey.PlayerId);

  const handleDefeatBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (id && playerId) {
      await dispatch(assignWinner({ id, playerId })).unwrap();
    }
  };

  return (
    <div className={st.controls}>
      <Button type="button" variant="cyan" onClick={handleDefeatBtnClick}>
        Сдаться
      </Button>
      <ExitButton />
    </div>
  );
}

export default GameControls;
