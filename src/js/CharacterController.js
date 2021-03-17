import { randInt } from './utils';
import Swordsman from "./models/Character/Humans/Swordsman";
import Bowman from "./models/Character/Humans/Bowman";
import Magician from "./models/Character/Humans/Magician";
import Undead from "./models/Character/Undead/Undead";
import Vampire from "./models/Character/Undead/Vampire";
import Daemon from "./models/Character/Undead/Daemon";

export default class CharacterController {
  static allowedTypes = {
    humans: [
      Swordsman,
      Bowman,
      Magician,
    ],
    undead: [
      Undead,
      Vampire,
      Daemon,
    ]
  }

  static getNations(){
    return Object.keys(this.allowedTypes);
  }

  static newChar(nation, maxLevel) {
    const types = this.allowedTypes[nation];
    return new types[randInt(types.length - 1)](randInt(maxLevel, 1));
  }
}
