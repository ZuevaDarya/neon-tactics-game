import { TCard, TPieceTypes } from "../../types/components-types";
import { TGameFieldPiece } from "../../types/services-types";

const isPieceCorrect = (item: TCard | TGameFieldPiece, pieceType: TPieceTypes) => {
  if (("type" in item && item.type !== pieceType) || "types" in item) {
    return false;
  }

  return true;
};

const checkRow = (
  minRowIdx: number,
  maxRowIdx: number,
  pieceType: TPieceTypes,
  field: (TCard | TGameFieldPiece)[]
) => {
  for (let i = minRowIdx; i <= maxRowIdx; i++) {
    if (!isPieceCorrect(field[i], pieceType)) {
      return false;
    }
  }

  return true;
};

const checkColumn = (
  startIdx: number,
  pieceType: TPieceTypes,
  field: (TCard | TGameFieldPiece)[]
) => {
  for (let i = startIdx; i < field.length; i += 4) {
    if (!isPieceCorrect(field[i], pieceType)) {
      return false;
    }
  }

  return true;
};

const checkDiagonal = (
  diagonalIdx: number[],
  pieceType: TPieceTypes,
  field: (TCard | TGameFieldPiece)[]
) => {
  for (const idx of diagonalIdx) {
    if (!isPieceCorrect(field[idx], pieceType)) {
      return false;
    }
  }

  return true;
};

const checkIndex = (i: number) => {
  return i >= 0 && i <= 15 ? true : false;
};

const checkPairIndexesInSquare = (i: number, j: number, rowLength: number = 4) => {
  return Math.min(i, j) % rowLength < Math.max(i, j) % rowLength ? true : false;
};

const checkSquare = (
  idxPairs: [[number, number], [number, number]],
  pieceType: TPieceTypes,
  field: (TCard | TGameFieldPiece)[]
) => {
  const [firstPair, secondPair] = idxPairs;

  const isIndexesCorrect =
    checkIndex(firstPair[0]) &&
    checkIndex(firstPair[1]) &&
    checkIndex(secondPair[0]) &&
    checkIndex(secondPair[1]);

  if (isIndexesCorrect) {
    const isAllPieceCorrect =
      isPieceCorrect(field[firstPair[0]], pieceType) &&
      isPieceCorrect(field[firstPair[1]], pieceType) &&
      isPieceCorrect(field[secondPair[0]], pieceType) &&
      isPieceCorrect(field[secondPair[1]], pieceType);

    if (isAllPieceCorrect) {
      const isWin =
        checkPairIndexesInSquare(firstPair[0], firstPair[1]) &&
        checkPairIndexesInSquare(secondPair[0], secondPair[1]);

      if (isWin) {
        return true;
      }
    }
  }

  return false;
};

const checkAllSquares = (
  cardIdx: number,
  pieceType: TPieceTypes,
  field: (TCard | TGameFieldPiece)[]
) => {
  return (
    checkSquare(
      [
        [cardIdx, cardIdx - 1],
        [cardIdx - 4, cardIdx - 5],
      ],
      pieceType,
      field
    ) ||
    checkSquare(
      [
        [cardIdx, cardIdx + 1],
        [cardIdx - 3, cardIdx - 4],
      ],
      pieceType,
      field
    ) ||
    checkSquare(
      [
        [cardIdx, cardIdx - 1],
        [cardIdx + 3, cardIdx + 4],
      ],
      pieceType,
      field
    ) ||
    checkSquare(
      [
        [cardIdx, cardIdx + 1],
        [cardIdx + 4, cardIdx + 5],
      ],
      pieceType,
      field
    )
  );
};

const isWin = (cardIdx: number, pieceType: TPieceTypes, field: (TCard | TGameFieldPiece)[]) => {
  const leftRightDiagonalIdx = [0, 5, 10, 15];
  const rightLeftDiagonalIdx = [3, 6, 9, 12];

  if (
    leftRightDiagonalIdx.includes(cardIdx) &&
    checkDiagonal(leftRightDiagonalIdx, pieceType, field)
  ) {
    return true;
  }

  if (
    rightLeftDiagonalIdx.includes(cardIdx) &&
    checkDiagonal(rightLeftDiagonalIdx, pieceType, field)
  ) {
    return true;
  }

  if (checkAllSquares(cardIdx, pieceType, field)) {
    return true;
  }

  if (cardIdx <= 3) {
    return checkRow(0, 3, pieceType, field) || checkColumn(cardIdx, pieceType, field);
  } else if (cardIdx <= 7) {
    return checkRow(4, 7, pieceType, field) || checkColumn(cardIdx - 4, pieceType, field);
  } else if (cardIdx <= 11) {
    return checkRow(8, 11, pieceType, field) || checkColumn(cardIdx - 8, pieceType, field);
  } else {
    return checkRow(12, 15, pieceType, field) || checkColumn(cardIdx - 12, pieceType, field);
  }
};

export default isWin;
