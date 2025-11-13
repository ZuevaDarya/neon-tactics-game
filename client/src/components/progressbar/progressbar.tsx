import { memo } from 'react';
import { TProgressBarProps } from "../../types/components-types";
import st from "./progressbar.module.css";

function Progressbar({ progressPercent }: TProgressBarProps) {
  return (
    <div className={st["progressbar-wrapper"]}>
      <span
        role="progressbar"
        aria-valuemin={0}
        aria-valuenow={Math.floor(progressPercent)}
        aria-valuemax={100}
        className={st.progressbar}
        style={{ transform: `translateX(${progressPercent}%)` }}
      />
    </div>
  );
}

export default memo(Progressbar);
