import { useDrop } from "react-dnd";
import { CardsType, RU_CARDS_TYPES } from "../../constants/cards-types";
import "./card.scss";
import GamePiece, { TGamePiece } from '../game-piece/game-piece';
import { memo } from 'react';

type TCard = {
  card?: {
    id: string;
    types: [CardsType, CardsType];
  };
};

function Card({ card }: TCard) {
  const [, dropTarget] = useDrop<TGamePiece>({
    accept: "piece",
    drop(props) {
      return <GamePiece type={props.type} id={props.id} />
    },
    collect: (monitor) => ({
      isDroped: monitor.didDrop(),
    }),
  });

  return card ? (
    dropTarget(
      <div className="card">
        <p>{RU_CARDS_TYPES[card.types[0]]}</p>
        <p>{RU_CARDS_TYPES[card.types[1]]}</p>
      </div>
    )
  ) : (
    <div className="card_empty"></div>
  );
}

export default memo(Card);
