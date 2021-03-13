import PositionedCharacter from "../PositionedCharacter";

export default class Team {
  constructor(nation) {
    this.persons = [];
    this.nation = nation;
  }

  get length() {
    return this.persons.length;
  }

  add(member) {
    this.persons.push(member);
  }

  addFew(characters, positions) {
    if (characters.length !== positions.length) {
      throw new Error('Positions count not equal characters count');
    }
    characters.forEach((character, index) => {
      this.add(new PositionedCharacter(character, positions[index]));
    })
  }

  * [Symbol.iterator]() {
    for (let key = 0; key < this.length; key += 1) {
      yield this.persons[key];
    }
  }
}
