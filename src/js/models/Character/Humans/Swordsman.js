import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level) {
    const attr = {
      type: 'swordsman',
      minLevel: 1,
      attack: 40,
      defence: 10,
      range: 1,
      step: 1,
    };
    super(attr, level);
  }
}
