import { Injectable } from '@nestjs/common';
import {
  TCard,
  TGameField,
  TGameFieldPiece,
  TPieceTypes,
} from 'src/types/types';

@Injectable()
export class WinCheckService {
  private FIELD_SIZE = 16;
  private LEFT_RIGHT_DIAGONAL_IDX = [0, 5, 10, 15];
  private RIGHT_LEFT_DIAGONAL_IDX = [3, 6, 9, 12];

  private isPieceCorrect(
    item: TCard | TGameFieldPiece,
    pieceType: TPieceTypes,
  ) {
    if (('type' in item && item.type !== pieceType) || 'types' in item) {
      return false;
    }
    return true;
  }

  private checkRow(
    minRowIdx: number,
    maxRowIdx: number,
    pieceType: TPieceTypes,
    field: TGameField,
  ) {
    for (let i = minRowIdx; i <= maxRowIdx; i++) {
      if (!this.isPieceCorrect(field[i], pieceType)) {
        return false;
      }
    }
    return true;
  }

  private checkColumn(
    startIdx: number,
    pieceType: TPieceTypes,
    field: TGameField,
  ) {
    for (let i = startIdx; i < field.length; i += 4) {
      if (!this.isPieceCorrect(field[i], pieceType)) {
        return false;
      }
    }
    return true;
  }

  private checkDiagonal(
    diagonalIdx: number[],
    pieceType: TPieceTypes,
    field: TGameField,
  ) {
    for (const idx of diagonalIdx) {
      if (!this.isPieceCorrect(field[idx], pieceType)) {
        return false;
      }
    }
    return true;
  }

  private checkIndex(i: number) {
    return i >= 0 && i <= this.FIELD_SIZE - 1;
  }

  private checkPairIndexesInSquare(
    i: number,
    j: number,
    rowLength: number = 4,
  ) {
    return Math.min(i, j) % rowLength < Math.max(i, j) % rowLength;
  }

  private checkSquare(
    idxPairs: [[number, number], [number, number]],
    pieceType: TPieceTypes,
    field: TGameField,
  ) {
    const [firstPair, secondPair] = idxPairs;

    const isIndexesCorrect =
      this.checkIndex(firstPair[0]) &&
      this.checkIndex(firstPair[1]) &&
      this.checkIndex(secondPair[0]) &&
      this.checkIndex(secondPair[1]);

    if (isIndexesCorrect) {
      const isAllPieceCorrect =
        this.isPieceCorrect(field[firstPair[0]], pieceType) &&
        this.isPieceCorrect(field[firstPair[1]], pieceType) &&
        this.isPieceCorrect(field[secondPair[0]], pieceType) &&
        this.isPieceCorrect(field[secondPair[1]], pieceType);

      if (isAllPieceCorrect) {
        const isWin =
          this.checkPairIndexesInSquare(firstPair[0], firstPair[1]) &&
          this.checkPairIndexesInSquare(secondPair[0], secondPair[1]);

        if (isWin) {
          return true;
        }
      }
    }

    return false;
  }

  private checkAllSquares(
    cardIdx: number,
    pieceType: TPieceTypes,
    field: TGameField,
  ) {
    return (
      this.checkSquare(
        [
          [cardIdx, cardIdx - 1],
          [cardIdx - 4, cardIdx - 5],
        ],
        pieceType,
        field,
      ) ||
      this.checkSquare(
        [
          [cardIdx, cardIdx + 1],
          [cardIdx - 3, cardIdx - 4],
        ],
        pieceType,
        field,
      ) ||
      this.checkSquare(
        [
          [cardIdx, cardIdx - 1],
          [cardIdx + 3, cardIdx + 4],
        ],
        pieceType,
        field,
      ) ||
      this.checkSquare(
        [
          [cardIdx, cardIdx + 1],
          [cardIdx + 4, cardIdx + 5],
        ],
        pieceType,
        field,
      )
    );
  }

  private hasCommonElements<T>(arr1: T[], arr2: T[]) {
    const set = new Set<T>(arr2);
    return arr1.some((item) => set.has(item));
  }

  public hasAvailableMoves(field: TGameField, targetCard: TCard | null) {
    if (targetCard === null) return true;
    return field.some(
      (item) =>
        'types' in item &&
        this.hasCommonElements<string>(item.types, targetCard.types),
    );
  }

  public checkWin(cardIdx: number, pieceType: TPieceTypes, field: TGameField) {
    if (
      this.LEFT_RIGHT_DIAGONAL_IDX.includes(cardIdx) &&
      this.checkDiagonal(this.LEFT_RIGHT_DIAGONAL_IDX, pieceType, field)
    ) {
      return true;
    }

    if (
      this.RIGHT_LEFT_DIAGONAL_IDX.includes(cardIdx) &&
      this.checkDiagonal(this.RIGHT_LEFT_DIAGONAL_IDX, pieceType, field)
    ) {
      return true;
    }

    if (this.checkAllSquares(cardIdx, pieceType, field)) {
      return true;
    }

    if (cardIdx <= 3) {
      return (
        this.checkRow(0, 3, pieceType, field) ||
        this.checkColumn(cardIdx, pieceType, field)
      );
    } else if (cardIdx <= 7) {
      return (
        this.checkRow(4, 7, pieceType, field) ||
        this.checkColumn(cardIdx - 4, pieceType, field)
      );
    } else if (cardIdx <= 11) {
      return (
        this.checkRow(8, 11, pieceType, field) ||
        this.checkColumn(cardIdx - 8, pieceType, field)
      );
    } else {
      return (
        this.checkRow(12, 15, pieceType, field) ||
        this.checkColumn(cardIdx - 12, pieceType, field)
      );
    }
  }

  public checkDraw(field: TGameField) {
    return field.every((item) => 'type' in item && item.type !== null);
  }
}
