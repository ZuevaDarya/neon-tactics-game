import uuid from "react-uuid";
import { MAX_PIECES_COUNT } from "../../constants/game-constants";
import { TStartForm } from "../../types/components-types";
import { TPlayer } from "../../types/services-types";

const preparePlayers = (formData: TStartForm): [TPlayer, TPlayer] => {
  const preparedPlayers = [];

  if (Math.random() < 0.5) {
    preparedPlayers.push({
      id: uuid(),
      name: formData.player1,
      countPieces: MAX_PIECES_COUNT,
      pieceType: "red",
    });

    preparedPlayers.push({
      id: uuid(),
      name: formData.player2,
      countPieces: MAX_PIECES_COUNT,
      pieceType: "black",
    });
  } else {
    preparedPlayers.push({
      id: uuid(),
      name: formData.player1,
      countPieces: MAX_PIECES_COUNT,
      pieceType: "black",
    });

    preparedPlayers.push({
      id: uuid(),
      name: formData.player2,
      countPieces: MAX_PIECES_COUNT,
      pieceType: "red",
    });
  }

  return preparedPlayers as [TPlayer, TPlayer];
};

export default preparePlayers;
