export default class Character {
  constructor(attr, level = 1) {
    this.type = attr.type;

    this.attack = attr.attack || 0;
    this.defence = attr.defence || 0;

    this.range = attr.range || 0;
    this.step = attr.step || 1;

    this.health = 10;

    if (new.target.name === 'Character') {
      throw new Error('Character is not available for creating instances');
    }

    this.level = 1;
    while (this.level < level) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level += 1;

    const mod = (this.health > 30) ? (0.80 + this.health) / 100 : 1;
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

  from(attr) {
    for (const prop in attr) {
      if (Object.prototype.hasOwnProperty.call(attr, prop)) {
        this[prop] = attr[prop];
      }
    }
  }
}
