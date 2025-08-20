import mx from "../../mixins.module.css";
import { TWaitingBlockProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Loader from "../loader/loader";
import st from "./waiting-block.module.css";

function WaitingBlock({ text, children }: TWaitingBlockProps) {
  return (
    <div className={st["waiting-block"]}>
      <div className={cn(st["waiting-block__message"], mx["responsiveFont"])}>
        <p className={st["waiting-block__text"]}>
          {text}
          <Loader variant="dotLoader" className={st["waiting-block__loader"]} />
        </p>
      </div>
      {children}
    </div>
  );
}

export default WaitingBlock;
