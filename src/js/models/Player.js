import PositionedCharacter from './PositionedCharacter';
import { randInt } from '../utils';
import { generatePositions } from '../generators';
import CharacterController from '../CharacterController';

export default class Player {
  constructor(nation, startPos, ai = false, team = []) {
    this.nation = nation;
    this.startPos = startPos;
    this.team = team;
    this.ai = ai;
  }

  get length() {
    return this.team.length;
  }

  addToTeam(member) {
    this.team.push(member);
  }

  addFewToTeam(characters, boardSize, fixedPositions = false) {
    let positions = fixedPositions;
    if (!positions) {
      positions = generatePositions(characters, this.startPos, boardSize);
    }
    characters.forEach((character, index) => {
      this.addToTeam(new PositionedCharacter(character, positions[index]));
    });
  }

  generateTeam(generateOptons) {
    const { characterCount, maxLevel, boardSize } = generateOptons;
    const characters = [];
    while (characters.length < characterCount) {
      characters.push(CharacterController.genChar(this.nation, maxLevel));
    }
    this.addFewToTeam(characters, boardSize);
  }

  findMemberByPos(position) {
    return this.team.find((item) => item.position === position) || null;
  }

  findIndexByPos(position) {
    return this.team.findIndex((item) => item.position === position) || null;
  }

  randomMember() {
    return this.team[randInt(this.length - 1)];
  }

  replaceMembers(startPos, boardSize) {
    const positions = generatePositions(this.team, startPos, boardSize);
    this.team.forEach((person, index) => {
      person.position = positions[index];
    });
  }

  deleteMember(position) {
    this.team.splice(this.findIndexByPos(position), 1);
  }
}
