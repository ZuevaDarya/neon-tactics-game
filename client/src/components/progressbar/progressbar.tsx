import { memo } from "react";
import useActivePlayer from "../../hooks/use-active-player";
import { TProgressBarProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import st from "./progressbar.module.css";

function Progressbar({ progressPercent, mode = "local" }: TProgressBarProps) {
  const { activePlayer } = useActivePlayer();

  return (
    <div className={st["progressbar-wrapper"]}>
      <span
        role="progressbar"
        aria-valuemin={0}
        aria-valuenow={Math.floor(progressPercent)}
        aria-valuemax={100}
        className={cn(
          st.progressbar,
          mode === "sync" && st["progressbar--sync"],
          activePlayer && st[`progressbar--${activePlayer.pieceType}`]
        )}
        style={{ transform: `translateX(${progressPercent}%)` }}
      />
    </div>
  );
}

export default memo(Progressbar);
