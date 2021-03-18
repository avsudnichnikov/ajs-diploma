import Person from './Person';
import CharacterController from '../CharacterController';
import randInt from '../randInt';
import generatePositions from '../generators';

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

  generateMembers(generateOptions, grade = false) {
    const {
      characterCount, maxLevel, minLevel = 1, boardSize,
    } = generateOptions;
    const characters = [];
    while (characters.length < characterCount) {
      characters.push(CharacterController.genChar(
        this.nation,
        maxLevel,
        minLevel,
        (grade) || maxLevel,
      ));
    }
    this.addFew(characters, boardSize);
  }

  findIndexByPos(position) {
    return this.persons.findIndex((item) => item.position === position) || null;
  }

  rand() {
    return this.persons[randInt(this.length - 1)];
  }

  replace(boardSize) {
    const positions = generatePositions(this.persons, this.startPos, boardSize);
    this.persons.forEach((person, index) => {
      person.position = positions[index];
    });
  }

  delete(position) {
    this.persons.splice(this.findIndexByPos(position), 1);
  }
}
