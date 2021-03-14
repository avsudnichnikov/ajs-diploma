import { randInt } from './utils';

export function generatePositions(characters, startPos, boardSize) {
  const leftSide = startPos === 'left';
  const positions = new Set();

  while (positions.size < characters.length) {
    const col = ((leftSide) ? 0 : boardSize - 2) + randInt(1);
    const row = randInt(boardSize - 1);
    positions.add(col + row * boardSize);
  }
  return [...positions];
}
