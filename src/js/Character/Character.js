export default class Character {
  constructor(level, type, attack = 0, defence = 0, range = 1, step = 1) {
    this.type = type;
    this.range = range;
    this.attack = attack;
    this.defence = defence;
    this.step = step;
    this.health = 100;

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
}
