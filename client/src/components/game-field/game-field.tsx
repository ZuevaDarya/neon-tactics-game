import { memo, useCallback } from "react";
import uuid from "react-uuid";
import useActivePlayer from "../../hooks/use-active-player";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  decrementPieceCount,
  incrementCountTurn,
  setActivePlayer,
  updateGame,
} from "../../services/thunks";
import { TCard } from "../../types/components-types";
import { TGameFieldPiece } from "../../types/services-types";
import isWin from "../../utils/functions/is-win";
import Card from "../card/card";
import GamePiece from "../game-piece/game-piece";
import "./game-field.scss";

function GameField() {
  const dispatch = useAppDispatch();
  const { field } = useAppSelector((state) => state.game);
  const { roomId } = useAppSelector((state) => state.room);
  const { activePlayer } = useActivePlayer();

  const handleDrop = useCallback(
    async (cardIdx: number, piece: TGameFieldPiece) => {
      if (!activePlayer || !roomId) return;

      try {
        const updatedField = [...field];
        const targetCard = updatedField[cardIdx] as TCard;
        updatedField[cardIdx] = piece;

        await dispatch(updateGame({ roomId, field: updatedField, targetCard })).unwrap();
        await dispatch(incrementCountTurn({ id: roomId })).unwrap();
        await dispatch(decrementPieceCount({ id: activePlayer.playerId })).unwrap();
        await dispatch(setActivePlayer({ id: roomId })).unwrap();

        if (isWin(cardIdx, piece.type, field)) {
          alert(`Победил ${activePlayer.name}`);
        }

      } catch (error) {
        console.error("Game move failed:", error);
      }
    },
    [activePlayer, field, roomId, dispatch]
  );

  return (
    <>
      <div className="game-field">
        {field.map((card, idx) => {
          if ("types" in card) {
            return <Card key={card.id} card={card} cardIdx={idx} onDrop={handleDrop} />;
          }
          return <GamePiece key={uuid()} type={card.type} isDraggible={false} />;
        })}
      </div>
    </>
  );
}

export default memo(GameField);
