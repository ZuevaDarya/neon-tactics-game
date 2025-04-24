import uuid from 'react-uuid';
import GamePiece, {
  TGamePiece,
} from "../game-piece/game-piece";
import PlayerIcon from "../player-icon/player-icon";
import "./player-block.scss";

type TPlayerBlock = Pick<TGamePiece, "type"> & {
  position: "left" | "right";
};

function PlayerBlock({ type, position }: TPlayerBlock) {
  return (
    <div className="player-block">
      {position === "left" && <PlayerIcon />}
      <GamePiece id={uuid()} type={type} />
      {position === "right" && <PlayerIcon />}
    </div>
  );
}

export default PlayerBlock;
