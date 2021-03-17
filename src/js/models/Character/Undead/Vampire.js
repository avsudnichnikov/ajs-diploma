import Character from '../Character';

export default class Vampire extends Character {
  constructor(level) {
    const attr = {
      type: 'vampire',
      minLevel: 1,
      attack: 25,
      defence: 25,
      range: 2,
      step: 2,
    };
    super(attr, level);
  }
}
