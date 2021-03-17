import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level) {
    const attr = {
      type: 'swordsman',
      grade: 0,
      attack: 40,
      defence: 10,
      range: 1,
      step: 4,
    };
    super(attr, level);
  }
}
