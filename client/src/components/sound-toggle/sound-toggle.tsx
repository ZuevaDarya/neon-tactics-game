import { TSoundToggleProps } from "../../types/components-types";
import Button from "../button/button";
import ToggleWrapper from "../toggle-wrapper/toggle-wrapper";

function SoundToggle({ isPlaying, handleClick }: TSoundToggleProps) {
  return (
    <ToggleWrapper
      handleClick={handleClick}
      ariaLabel={`Turn ${isPlaying ? "off" : "on"} the sound`}
    >
      <Button type="button" variant={isPlaying ? "soundOn" : "soundOff"} />
    </ToggleWrapper>
  );
}

export default SoundToggle;
