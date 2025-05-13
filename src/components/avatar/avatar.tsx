import { TAvatarProps } from "../../types/components-types";
import "./avatar.scss";

function Avatar({ src }: TAvatarProps) {
  return (
    <div className="avatar-block">
      <img className="avatar-block__img" src={src} alt="avatar" />
    </div>
  );
}

export default Avatar;
