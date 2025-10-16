import mx from "../../mixins.module.css";
import { TGamePieceBlockProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import GamePiece from "../game-piece/game-piece";
import st from "./game-piece-block.module.css";

function GamePieceBlock({ countPieces, type }: TGamePieceBlockProps) {
  return (
    <div className={st["piece-container"]}>
      <GamePiece type={type} isDraggible={true} isNonPlayed={true} isAnimated={false} />
      <span className={cn(st.text, st[`text--${type}`], mx["responsiveFont"])}>Осталось: {countPieces}</span>
    </div>
  );
}

export default GamePieceBlock;
