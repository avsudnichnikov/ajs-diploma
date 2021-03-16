import Character from './models/Character/Character';
import DCoords from './DCoords';

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

  damage(target) {
    return Math.max(this.character.attack - target.character.defence, this.character.attack * 0.1);
  }

  distanceTo(cell, boardSize) {
    return DCoords.distancePos(cell, this.position, boardSize, false);
  }

  isAttackCell(cell, boardSize) {
    return this.distanceTo(cell, boardSize) <= this.character.range;
  }

  isMoveCell(cell, boardSize) {
    return this.distanceTo(cell, boardSize) <= this.character.step;
  }

  getAttackCells(boardSize) {
    return DCoords.getArea(this.position, this.character.range, false, boardSize);
  }

  getMoveCells(boardSize) {
    return DCoords.getArea(this.position, this.character.step, false, boardSize);
  }
}
