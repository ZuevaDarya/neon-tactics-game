import uuid from 'react-uuid';
import { MAX_PIECES_COUNT } from '../constants/game-constants';
import { TPlayer } from '../types/services-types';

export const PLAYER1: TPlayer = {
  id: uuid(),
  name: "Дашуля",
  countPieces: MAX_PIECES_COUNT,
  pieceType: "black",
};

export const PLAYER2: TPlayer = {
  id: uuid(),
  name: "Тигруля",
  countPieces: MAX_PIECES_COUNT,
  pieceType: "red",
};

