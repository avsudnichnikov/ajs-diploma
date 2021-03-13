import {randInt} from "./utils";
import Team from "./Team";
import PositionedCharacter from "./PositionedCharacter";

export function* characterGenerator(allowedTypes, maxLevel) {
  yield new allowedTypes[randInt(allowedTypes.length)](randInt(maxLevel) + 1);
}

function generatePosition(boardSize, leftSide) {
  const col = ((leftSide) ? 0 : boardSize - 2) + randInt(1);
  const row = randInt(boardSize - 1);
  return col + row * boardSize;
}

export function generateTeam(allowedTypes, maxLevel, characterCount, boardSize) {
  const team = new Team();
  for (let item = 1; item <= characterCount; item += 1) {
    const character = characterGenerator(allowedTypes, maxLevel).next().value;
    const position = generatePosition(boardSize, true).next().value;
    team.add(new PositionedCharacter(character, position));
  }
  return team;
}
