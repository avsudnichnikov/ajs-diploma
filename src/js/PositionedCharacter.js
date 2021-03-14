import Character from './Character/Character';
import {distance, indexToCoords} from "./utils";

export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }

  #isActionCell(cell, boardSize, dist){
    const coordsCell = indexToCoords(cell, boardSize);
    const coordsPers = indexToCoords(this.position, boardSize);
    return distance(coordsCell, coordsPers) <= dist;
  }

  isAttackCell(cell, boardSize){
    return this.#isActionCell(cell, boardSize, this.character.range);
  }

  isMoveCell(cell, boardSize){
    return this.#isActionCell(cell, boardSize, this.character.step);
  }
}
