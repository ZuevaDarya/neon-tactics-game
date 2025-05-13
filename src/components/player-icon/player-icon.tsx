import { TPlayerIconProps } from '../../types/components-types';
import Avatar from '../avatar/avatar';
import "./player-icon.scss";

function PlayerIcon({ name, src }: TPlayerIconProps) {
  return (
    <div className="player-info">
      <Avatar src={src} />
      <p className="plauer-info__name">{ name }</p>
    </div>
  );
}

export default PlayerIcon;
