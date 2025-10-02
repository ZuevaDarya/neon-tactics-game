import { TPlayerBlockProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import GamePieceBlock from "../game-piece-block/game-piece-block";
import Player from "../player-icon/player";
import st from "./player-block.module.css";

function PlayerBlock({ player, position }: TPlayerBlockProps) {
  return (
    <div
      className={cn(
        st["player-block"],
        st[`player-block--${player.pieceType}`],
        player.isActive && st["player-block--active"]
      )}
    >
      {position === "left" && (
        <Player src={player.avatarPath || ""} name={player.name} type={player.pieceType} />
      )}
      {player.pieceType && (
        <GamePieceBlock countPieces={player.countPiece} type={player.pieceType} />
      )}
      {position === "right" && (
        <Player
          src={player.avatarPath || ""}
          name={player.name}
          type={player.pieceType}
          isRight={true}
        />
      )}
    </div>
  );
}

export default PlayerBlock;
