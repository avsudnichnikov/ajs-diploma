import Character from '../Character';

export default class Undead extends Character {
  constructor(level) {
    const attr = {
      type: 'undead',
      minLevel: 1,
      attack: 40,
      defence: 10,
      range: 1,
      step: 1,
    };
    super(attr, level);
  }
}
