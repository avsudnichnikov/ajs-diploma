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
    return new this.allowedTypes[randInt(this.allowedTypes.length - 1)](randInt(maxLevel));
  }
}
