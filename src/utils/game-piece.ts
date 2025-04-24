
type TPiece = "red" | "black";

class GamePiece {
  public id: string;
  public type: TPiece;
  public count: number;

  constructor(id: string, type: TPiece) {
    this.id = id;
    this.type = type;
    this.count = 4;
  }

  public decreaseCountPiece() {
    this.count -= 1;
  }

  public isHavePiece() {
    if (this.count > 0) {
      return true;
    }

    return false;
  }
}

export default GamePiece;
