import { TToggleWrapper } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import st from "./toggle-wrapper.module.css";

function ToggleWrapper({ children, handleClick, classes, ariaLabel, isOn }: TToggleWrapper) {
  return (
    <div
      className={cn(st["toggle-wrapper"], isOn && st["toggle-wrapper--on"], classes)}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export default ToggleWrapper;
