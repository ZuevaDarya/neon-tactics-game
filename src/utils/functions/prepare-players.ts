import uuid from "react-uuid";
import { MAX_PIECES_COUNT } from "../../constants/game-constants";
import { TStartForm } from "../../types/components-types";
import { TPlayer } from "../../types/services-types";
import { PieceType } from '../../constants/piece-type';

const preparePlayers = (formData: TStartForm): [TPlayer, TPlayer] => {
  const preparedPlayers = [];
  let pieceType1 = "", pieceType2 = "";

  if (Math.random() < 0.5) {
    pieceType1 = PieceType.Red;
    pieceType2 = PieceType.Black;
  } else {
    pieceType1 = PieceType.Black;
    pieceType2 = PieceType.Red;
  }

  preparedPlayers.push({
    id: uuid(),
    name: formData.player1,
    countPieces: MAX_PIECES_COUNT,
    pieceType: pieceType1,
  });

  preparedPlayers.push({
    id: uuid(),
    name: formData.player2,
    countPieces: MAX_PIECES_COUNT,
    pieceType: pieceType2,
  });

  return preparedPlayers as [TPlayer, TPlayer];
};

export default preparePlayers;
