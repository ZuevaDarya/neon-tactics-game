import { memo, useEffect, useState } from "react";
import uuid from "react-uuid";
import {
  increaseCountTurn,
  resetActivePlayer,
  setActivePlayer,
  setWinner,
} from "../../services/slices/game-state-slice";
import { updatePlayer } from "../../services/slices/players-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TPieceTypes } from "../../types/components-types";
import isWin from "../../utils/functions/is-win";
import Card from "../card/card";
import GamePiece from "../game-piece/game-piece";
import "./game-field.scss";

function GameField() {
  const [curentCardIdx, setCurrentCardIdx] = useState<number>(-1);
  const [currentPieceType, setCurrentPieceType] = useState<TPieceTypes | null>(null);
  const [isDropped, setIsDropped] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const field = useAppSelector((state) => state.gameField.field);
  const { activePlayer, winner } = useAppSelector((state) => state.gameState);
  const players = useAppSelector((state) => state.players.players);

  useEffect(() => {
    setIsDropped(false);
    if (currentPieceType && curentCardIdx !== -1 && activePlayer) {
      if (isWin(curentCardIdx, currentPieceType, field)) {
        dispatch(setWinner(activePlayer));
      }
    }
  }, [field, curentCardIdx, currentPieceType, dispatch]);

  useEffect(() => {
    if (!winner) {
      if (isDropped) {
        if (activePlayer) {
          const nextTurnPlayer = players.find(
            (player) => player.id !== activePlayer.id
          );

          if (nextTurnPlayer) {
            dispatch(setActivePlayer(nextTurnPlayer));
            dispatch(
              updatePlayer({
                ...activePlayer,
                countPieces: activePlayer.countPieces - 1,
              })
            );
            dispatch(increaseCountTurn());
          }
        }
      }
    } else {
      dispatch(resetActivePlayer());
      alert(`${winner?.name} победил`);
    }
  }, [isDropped, winner, dispatch]);

  return (
    <div className="game-field">
      {field.map((card) => {
        if ("types" in card) {
          return (
            <Card
              key={card.id}
              card={card}
              setCurrentCardIdx={setCurrentCardIdx}
              setCurrentPieceType={setCurrentPieceType}
              setIsDropped={setIsDropped}
            />
          );
        }
        return <GamePiece key={uuid()} type={card.type} isDraggible={false} />;
      })}
    </div>
  );
}

export default memo(GameField);
