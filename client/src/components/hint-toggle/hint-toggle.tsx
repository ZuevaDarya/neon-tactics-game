import { useEffect } from "react";
import { StorageKey } from "../../constants/storage-keys";
import { setIsHintOn } from "../../services/slices/game-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { THintToggleProps } from "../../types/components-types";
import Button from "../button/button";
import ToggleWrapper from "../toggle-wrapper/toggle-wrapper";

function HintToggle({ classes }: THintToggleProps) {
  const dispatch = useAppDispatch();
  const { isHintOn } = useAppSelector((state) => state.game);

  useEffect(() => {
    const isOn = sessionStorage.getItem(StorageKey.IsHintOn) === "true";
    dispatch(setIsHintOn(isOn));
  }, []);

  return (
    <ToggleWrapper
      classes={classes}
      handleClick={() => dispatch(setIsHintOn(!isHintOn))}
      isOn={isHintOn}
      ariaLabel={isHintOn ? "Hidden hint" : "Show hint"}
    >
      <Button type="button" variant="hint" />
    </ToggleWrapper>
  );
}

export default HintToggle;
