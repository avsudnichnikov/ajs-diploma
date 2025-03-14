import Character from '../Character';

export default class Magician extends Character {
  constructor(level) {
    const attr = {
      type: 'magician',
      grade: 2,
      attack: 10,
      defence: 40,
      range: 4,
      step: 1,
    };
    super(attr, level);
  }
}
