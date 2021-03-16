import Character from './Character/Character';
import DCoords from "./DCoords";

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

  damage(target){
    return Math.max(this.character.attack - target.character.defence, this.character.attack * 0.1);
  }

  #isActionCell(cell, boardSize, dist) {
    const coordsCell = DCoords.posToCoords(cell, boardSize);
    const coordsPers = DCoords.posToCoords(this.position, boardSize);
    return DCoords.distance(coordsCell, coordsPers) <= dist;
  }

  isAttackCell(cell, boardSize) {
    return this.#isActionCell(cell, boardSize, this.character.range);
  }

  isMoveCell(cell, boardSize) {
    return this.#isActionCell(cell, boardSize, this.character.step);
  }

  getAttackCells(boardSize) {
    return DCoords.getArea(this.position, this.character.range, boardSize);
  }

  getMoveCells(boardSize) {
    return DCoords.getArea(this.position, this.character.step, boardSize);
  }
}
