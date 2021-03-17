import Character from '../Character';

export default class Bowman extends Character {
  constructor(level) {
    const attr = {
      type: 'bowman',
      grade: 1,
      attack: 25,
      defence: 25,
      range: 2,
      step: 2,
    };
    super(attr, level);
  }
}
