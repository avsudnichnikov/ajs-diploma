import { randInt} from './utils';
import DCoords from "./DCoords";

export function generatePositions(characters, startPos, boardSize) {
  const leftSide = startPos === 'left';
  const positions = new Set();

  while (positions.size < characters.length) {
    const x = ((leftSide) ? 0 : boardSize - 2) + randInt(1);
    const y = randInt(boardSize - 1);
    positions.add(DCoords.coordsToPos({x, y}, boardSize));
  }
  return [...positions];
}
