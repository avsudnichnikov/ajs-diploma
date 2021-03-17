import Person from './Person';
import CharacterController from '../CharacterController';
import { randInt } from '../utils';
import { generatePositions } from '../generators';

export default class Team {
  constructor(nation, startPos, ai = false, persons = []) {
    this.nation = nation;
    this.startPos = startPos;
    this.persons = persons;
    this.ai = ai;
  }

  * [Symbol.iterator]() {
    for (let key = 0; key < this.persons.length; key += 1) {
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
      this.add(new Person(character, positions[index]));
    });
  }

  generateMembers(generateOptons) {
    const { characterCount, maxLevel, boardSize } = generateOptons;
    const characters = [];
    while (characters.length < characterCount) {
      characters.push(CharacterController.genChar(this.nation, maxLevel));
    }
    this.addFew(characters, boardSize);
  }

  findMemberByPos(position) {
    return this.persons.find((item) => item.position === position) || null;
  }

  findIndexByPos(position) {
    return this.persons.findIndex((item) => item.position === position) || null;
  }

  rand() {
    return this.persons[randInt(this.length - 1)];
  }

  replace(startPos, boardSize) {
    const positions = generatePositions(this.persons, startPos, boardSize);
    this.persons.forEach((person, index) => {
      person.position = positions[index];
    });
  }

  delete(position) {
    this.persons.splice(this.findIndexByPos(position), 1);
  }
}
