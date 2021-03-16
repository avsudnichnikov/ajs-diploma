import Character from '../Character';

export default class Daemon extends Character {
  constructor(level) {
    const attack = 10;
    const defence = 40;
    const range = 4;
    super(level, 'daemon', attack, defence, range);
  }
}
