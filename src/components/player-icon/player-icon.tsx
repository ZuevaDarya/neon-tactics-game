import { TPlayerIconProps } from '../../types/components-types';
import "./player-icon.scss";

function PlayerIcon({ name }: TPlayerIconProps) {
  return (
    <div className="player-info">
      <span className="player-info__image" />
      <p className="plauer-info__name">{ name }</p>
    </div>
  );
}

export default PlayerIcon;
