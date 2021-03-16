import PositionedCharacter from '../PositionedCharacter';
import {generatePositions} from "../generators";
import {randInt} from "../utils";

export default class Team {
  constructor(nation, startPos, player) {
    this.persons = [];
    this.nation = nation;
    this.startPos = startPos;
    this.player = player;
  }

  * [Symbol.iterator]() {
    for (let key = 0; key < this.length; key += 1) {
      yield this.persons[key];
    }
  }

  get length() {
    return this.persons.length;
  }

  add(member) {
    this.persons.push(member);
  }

  addFew(characters, boardSize, fixedPositions = false) {
    let positions = fixedPositions;
    if (!positions) {
      positions = generatePositions(characters, this.startPos, boardSize);
    }
    characters.forEach((character, index) => {
      this.add(new PositionedCharacter(character, positions[index]));
    });
  }

  generate({characterCount, maxLevel, boardSize} = generateOptons) {
    const characters = this.#generateCharacters(characterCount, maxLevel);
    this.addFew(characters, boardSize);
  }

  findByPos(position) {
    return this.persons.find((item) => item.position === position) || null;
  }

  findIndexByPos(position) {
    return this.persons.findIndex((item) => item.position === position) || null;
  }

  rand(){
    return this.persons[randInt(this.length - 1)];
  }

  replaceMembers(startPos, boardSize) {
    const positions = generatePositions(this.persons, startPos, boardSize);

    this.persons.forEach((person, index) => {
      person.position = positions[index];
    });
  }

  deleteMember(position){
    this.persons.splice(this.findIndexByPos(position), 1);
  }

  #generateCharacters(characterCount, maxLevel) {
    const characters = [];
    while (characters.length < characterCount) {
      characters.push(this.nation.newChar(maxLevel));
    }
    return characters;
  }
}
