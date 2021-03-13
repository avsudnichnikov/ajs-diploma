import {randInt} from "./utils";

export function* characterGenerator(allowedTypes, maxLevel) {
  yield new allowedTypes[randInt(allowedTypes.length)](randInt(maxLevel) + 1);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
}
