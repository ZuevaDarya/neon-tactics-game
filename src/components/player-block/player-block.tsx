import { TPlayerBlockProps } from "../../types/components-types";
import GamePieceBlock from "../game-piece-block/game-piece-block";
import PlayerIcon from "../player-icon/player-icon";
import "./player-block.scss";

function PlayerBlock({ player, position }: TPlayerBlockProps) {
  return (
    <div className="player-block">
      {position === "left" && <PlayerIcon name={player.name} />}
      <GamePieceBlock countPieces={player.countPieces} type={player.pieceType} />
      {position === "right" && <PlayerIcon name={player.name} />}
    </div>
  );
}

export default PlayerBlock;
