import mx from "../../mixins.module.css";
import { TWinnerModalContentProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Player from "../player-icon/player";
import st from "../winner-modal/winner-modal.module.css";

function WinnerModalContent({ winners, title }: TWinnerModalContentProps) {
  return (
    <>
      <h1 className={cn(st["winner-modal__title"], mx["responsiveFont"])}>{title}!</h1>
      <div className={st["winner-modal__content"]}>
        {winners.map((winner, idx) => (
          <Player key={`${winner.roomId}${idx}`} src={winner.avatarPath || ""} name={winner.name} />
        ))}
      </div>
    </>
  );
}

export default WinnerModalContent;
