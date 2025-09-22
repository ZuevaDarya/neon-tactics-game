import { TPlayerBlockProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import GamePieceBlock from "../game-piece-block/game-piece-block";
import Player from "../player-icon/player";
import st from "./player-block.module.css";

function PlayerBlock({ player, position }: TPlayerBlockProps) {
  return (
    <div className={cn(st["player-block"], st[`player-block--${player.pieceType}`])}>
      {position === "left" && (
        <Player
          src={player.avatarPath || ""}
          name={player.name}
          type={player.pieceType || undefined}
        />
      )}
      {player.pieceType && (
        <GamePieceBlock countPieces={player.countPiece} type={player.pieceType} />
      )}
      {position === "right" && (
        <Player
          src={player.avatarPath || ""}
          name={player.name}
          type={player.pieceType || undefined}
        />
      )}
    </div>
  );
}

export default PlayerBlock;
