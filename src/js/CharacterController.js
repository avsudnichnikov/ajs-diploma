import randInt from './randInt';
import Swordsman from './models/Character/Humans/Swordsman';
import Bowman from './models/Character/Humans/Bowman';
import Magician from './models/Character/Humans/Magician';
import Undead from './models/Character/Undead/Undead';
import Vampire from './models/Character/Undead/Vampire';
import Daemon from './models/Character/Undead/Daemon';

export default class CharacterController {
  static #allowedTypes = {
    humans: {
      swordsman: Swordsman,
      bowman: Bowman,
      magician: Magician,
    },
    undead: {
      undead: Undead,
      vampire: Vampire,
      daemon: Daemon,
    },
  }

  static getNations() {
    return Object.keys(this.#allowedTypes);
  }

  static getTypesByNation(nation) {
    return Object.values(this.#allowedTypes[nation]);
  }

  static getTypeList() {
    return Object.values(this.#allowedTypes).reduce(
      (result, nations) => ({ ...nations, ...result }), {},
    );
  }

  static getTypeByName(type) {
    return this.getTypeList()[type];
  }

  static genChar(nation, maxLevel, minLevel, grade) {
    const types = this.getTypesByNation(nation);
    let char;
    while (!char) {
      char = new types[randInt(types.length - 1)](randInt(maxLevel, minLevel));
      if (char.grade > grade) {
        char = undefined;
      }
    }
    return char;
  }

  static restoreChar(data) {
    const { type, ...attr } = data;
    const Class = this.getTypeByName(type);
    const character = new Class();
    character.setAttr(attr);
    return character;
  }
}
