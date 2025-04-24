import { TGamePieceBlockProps } from "../types/components-types";
import GamePiece from "./game-piece";

class Player {
  public id: string;
  public piece: GamePiece;

  constructor(id: string, piece: TGamePieceBlockProps) {
    this.id = id;
    this.piece = new GamePiece(piece.id, piece.type);
  }
}

export default Player;
