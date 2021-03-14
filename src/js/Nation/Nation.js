import {randInt} from "../utils";

export default class Nation {
  constructor(title, allowedTypes = []) {
    this.title = title;
    this.allowedTypes = allowedTypes;
  }

  addType(classChar) {
    this.allowedTypes.push(classChar);
  };

  newChar(maxLevel) {
    const character = new this.allowedTypes[randInt(this.allowedTypes.length - 1)](randInt(maxLevel, 1));
    character.nation = this.title;
    return character;
  }
}
