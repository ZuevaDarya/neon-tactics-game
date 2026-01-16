import { StorageKey } from "../../constants/storage-keys";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { assignWinner } from "../../services/thunks";
import { TGameControlsProps } from "../../types/components-types";
import Button from "../button/button";
import ExitButton from "../exit-button/exit-button";
import HintToggle from "../hint-toggle/hint-toggle";
import SoundToggle from "../sound-toggle/sound-toggle";
import ThemeToggle from "../theme-toggle/theme-toggle";
import st from "./game-controls.module.css";

function GameControls({ soundToggleProps }: TGameControlsProps) {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.room);
  const playerId = sessionStorage.getItem(StorageKey.PlayerId);

  const handleDefeatBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (id && playerId) {
      await dispatch(assignWinner({ id, playerId })).unwrap();
    }
  };

  return (
    <div className={st.controls}>
      <div className={st["controls__toggles"]}>
        <ThemeToggle />
        <HintToggle />
        <SoundToggle {...soundToggleProps} />
      </div>
      <Button type="button" variant="cyan" onClick={handleDefeatBtnClick}>
        Сдаться
      </Button>
      <ExitButton />
    </div>
  );
}

export default GameControls;
