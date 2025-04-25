import { TPlayerBlockProps } from "../../types/components-types";
import GamePieceBlock from "../game-piece-block/game-piece-block";
import PlayerIcon from "../player-icon/player-icon";
import "./player-block.scss";

function PlayerBlock({ type, position }: TPlayerBlockProps) {
  return (
    <div className="player-block">
      {position === "left" && <PlayerIcon />}
      <GamePieceBlock type={type} />
      {position === "right" && <PlayerIcon />}
    </div>
  );
}

export default PlayerBlock;
