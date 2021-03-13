import {randInt} from "./utils";
import Team from "./Nation/Team";

function generateCharacters(nation, characterCount, maxLevel){
  const characters = [];
  while (characters.length < characterCount) {
    characters.push(nation.newChar(randInt(maxLevel) + 1));
  }
  return characters;
}

export function generatePositions(characters, side, boardSize) {
  const leftSide = side === 'left';
  const positions = new Set();

  while (positions.size < characters.length) {
    const col = ((leftSide) ? 0 : boardSize - 2) + randInt(1);
    const row = randInt(boardSize - 1);
    positions.add(col + row * boardSize);
  }

  return [...positions];
}

export function generateTeam(nation, characterCount, maxLevel, side, boardSize) {
  const team = new Team(nation);

  const characters = generateCharacters(team.nation, characterCount, maxLevel);
  const positions = generatePositions(characters, side, boardSize)

  team.addFew(characters, positions);

  return team;
}
