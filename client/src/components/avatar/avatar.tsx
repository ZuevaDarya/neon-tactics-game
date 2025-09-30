import { TAvatarProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import st from "./avatar.module.css";

function Avatar({ src, isRight }: TAvatarProps) {
  return (
    <div className={st.avatar}>
      <img
        className={cn(st["avatar__img"], isRight && st["avatar__img--right"])}
        src={src}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar;
