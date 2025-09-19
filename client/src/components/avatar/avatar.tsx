import { TAvatarProps } from "../../types/components-types";
import st from "./avatar.module.css";

function Avatar({ src }: TAvatarProps) {
  return (
    <div className={st.avatar}>
      <img className={st["avatar__img"]} src={src} alt="avatar" />
    </div>
  );
}

export default Avatar;
