import Character from "./Character";

export default class Bowman extends Character {
  constructor(level) {
    const attack = 25;
    const defence = 25;
    const range = 2;
    super(level, 'Bowman', attack, defence, range);
  }
}
