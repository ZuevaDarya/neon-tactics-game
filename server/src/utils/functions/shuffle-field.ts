import { randomInt } from 'crypto';

function shuffleField<T>(arr: T[]): T[] {
  const shuffledArr = [...arr];

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}

export default shuffleField;
