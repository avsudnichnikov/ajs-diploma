import { randInt } from '../../utils';

export default class Character {
  constructor(baseAttr, level) {
    this.type = baseAttr.type;
    this.grade = baseAttr.grade || 0;
    this.attack = baseAttr.attack || 0;
    this.defence = baseAttr.defence || 0;
    this.range = baseAttr.range || 0;
    this.step = baseAttr.step || 1;

    this.health = 100;

    if (new.target.name === 'Character') {
      throw new Error('Character is not available for creating instances');
    }

    this.level = 1;
    while (this.level < level) {
      this.levelUp(true);
    }
  }

  levelUp(emulate = false) {
    this.level += 1;

    if (emulate) {
      this.health = randInt(100, 1);
    }

    const mod = (this.health > 30) ? (0.80 + this.health / 100) : 1;
    this.attack = Math.round(this.attack * mod);
    this.defence = Math.round(this.defence * mod);

    this.health += 80;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;
    if (this._health < 0) this._health = 0;
    if (this._health > 100) this._health = 100;
  }

  setAttr(attr) {
    if (typeof attr !== 'object') {
      throw new Error('Argument attr can be object');
    }
    for (const prop in attr) {
      if (Object.prototype.hasOwnProperty.call(attr, prop)) {
        this[prop] = attr[prop];
      }
    }
  }
}
