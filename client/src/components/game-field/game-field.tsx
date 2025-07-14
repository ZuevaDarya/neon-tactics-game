import { memo, useEffect, useState } from "react";
import uuid from "react-uuid";
// import { updatePlayer } from "../../services/slices/players-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TPieceTypes } from "../../types/components-types";
import Card from "../card/card";
import GamePiece from "../game-piece/game-piece";
import "./game-field.scss";

function GameField() {
  const [curentCardIdx, setCurrentCardIdx] = useState<number>(-1);
  const [currentPieceType, setCurrentPieceType] = useState<TPieceTypes | null>(null);
  const [isDropped, setIsDropped] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { field } = useAppSelector((state) => state.game);
  const { roomId } = useAppSelector((state) => state.room);
  // const { activePlayer, winner } = useAppSelector((state) => state.gameState);
  // const players = useAppSelector((state) => state.players.players);
  // const { isModalOpen, closeModal, openModal } = useModal();

  useEffect(() => {
    // setIsDropped(false);
    // if (currentPieceType && curentCardIdx !== -1 && activePlayer) {
    //   if (isWin(curentCardIdx, currentPieceType, field)) {
    //     dispatch(setWinner(activePlayer));
    //   }
    // }
  }, [isDropped]);

  return (
    <>
      {/* {winner && isModalOpen && <WinnerModal onClose={closeModal} winner={winner} />} */}
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
    </>
  );
}

export default memo(GameField);
