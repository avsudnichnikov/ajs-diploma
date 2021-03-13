export default class Character {
  constructor(level, type, attack = 0, defence = 0, range = 1) {
    this.type = type;
    this.range = range;
    this.attack = attack;
    this.defence = defence;
    this.health = 50;

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
  }
}
