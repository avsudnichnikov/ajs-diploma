import Character from "./Character";

export default class Swordsman extends Character {
  constructor(level) {
    const attack = 40;
    const defence = 10;
    const range = 1;
    super(level, 'Swordsman', attack, defence, range);
  }
}
