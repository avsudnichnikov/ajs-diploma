import Character from '../Character';

export default class Bowman extends Character {
  constructor(level) {
    const attr = {
      type: 'bowman',
      minLevel: 1,
      attack: 25,
      defence: 25,
      range: 2,
      step: 1,
    };
    super(attr, level);
  }
}
