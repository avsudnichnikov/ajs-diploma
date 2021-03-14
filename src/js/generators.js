import {coordsToIndex, randInt} from './utils';

export function generatePositions(characters, startPos, boardSize) {
  const leftSide = startPos === 'left';
  const positions = new Set();

  while (positions.size < characters.length) {
    const x = ((leftSide) ? 0 : boardSize - 2) + randInt(1);
    const y = randInt(boardSize - 1);
    positions.add(coordsToIndex({x, y}, boardSize));
  }
  return [...positions];
}
