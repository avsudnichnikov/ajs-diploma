export default class Team {
  constructor() {
    this.persons = [];
  }

  get length() {
    return this.persons.length;
  }

  add(member) {
    this.persons.push(member);
  }

  * [Symbol.iterator]() {
    for (let key = 0; key < this.length; key += 1) {
      yield new Person(this.persons[key]);
    }
  }
}
