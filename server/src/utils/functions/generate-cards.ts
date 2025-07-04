import { randomUUID } from 'crypto';
import { CardType } from 'src/constants/card-types';
import { TCard } from 'src/types/types';

const BASE_TYPES = [
  CardType.Maple,
  CardType.Sakura,
  CardType.Pine,
  CardType.Iris,
];
const MODIFIER_TYPES = [
  CardType.Sun,
  CardType.Paper,
  CardType.Bird,
  CardType.Rain,
];

function generateCards(): TCard[] {
  const cards: TCard[] = [];

  for (const baseType of BASE_TYPES) {
    for (const modifierType of MODIFIER_TYPES) {
      cards.push({
        id: randomUUID(),
        types: [baseType, modifierType],
      });
    }
  }

  return cards;
}

export default generateCards;
