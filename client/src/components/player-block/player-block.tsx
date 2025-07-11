import { TPlayerBlockProps } from "../../types/components-types";
import GamePieceBlock from "../game-piece-block/game-piece-block";
import PlayerIcon from "../player-icon/player-icon";
import "./player-block.scss";

function PlayerBlock({ player, position }: TPlayerBlockProps) {
  return (
    <div className="player-block">
      {position === "left" && (
        <PlayerIcon src={`/assets/images/j-${player.pieceType}-1.png`} name={player.name} />
      )}
      {player.pieceType && (
        <GamePieceBlock countPieces={player.countPiece} type={player.pieceType} />
      )}
      {position === "right" && (
        <PlayerIcon src={`/assets/images/j-${player.pieceType}-1.png`} name={player.name} />
      )}
    </div>
  );
}

export default PlayerBlock;
