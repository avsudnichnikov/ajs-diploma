import Character from '../Character';

export default class Magician extends Character {
  constructor(level) {
    const attack = 10;
    const defence = 40;
    const range = 4;
    super(level, 'magician', attack, defence, range);
  }
}
