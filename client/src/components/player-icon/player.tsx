import mx from "../../mixins.module.css";
import { TPlayerIconProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Avatar from "../avatar/avatar";
import st from "./player.module.css";

function Player({ name, src, type, isRight }: TPlayerIconProps) {
  return (
    <div className={cn(st.player, st[`player--${type}`])}>
      <Avatar src={src} isRight={isRight} />
      <p className={cn(st["player__name"], mx["responsiveFont"])}>{name}</p>
    </div>
  );
}

export default Player;
