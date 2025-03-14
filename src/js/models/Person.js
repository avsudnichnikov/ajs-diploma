import Character from './Character/Character';
import DCoords from '../DCoords';

export default class Person {
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
    const { attack } = this.character;
    const { defence } = target.character;
    return Math.round(Math.max(attack - defence, attack * 0.1));
  }

  distanceTo(cell, boardSize) {
    return DCoords.distancePos(cell, this.position, boardSize, false);
  }

  inLine(cell, boardSize) {
    return DCoords.isOnLinePos(cell, this.position, boardSize);
  }

  isAttackCell(cell, boardSize) {
    return this.distanceTo(cell, boardSize) <= this.character.range;
  }

  isMoveCell(cell, boardSize) {
    return this.distanceTo(cell, boardSize) <= this.character.step && this.inLine(cell, boardSize);
  }

  getAttackCells(boardSize) {
    return DCoords.getArea(this.position, this.character.range, false, boardSize);
  }

  getMoveCells(boardSize) {
    return DCoords.getLines(this.position, this.character.step, boardSize);
  }

  getMoveToTargetCells(target, boardSize, moveCells = false) {
    const personMoveCells = DCoords.getMoveCells(boardSize);
    const targetMoveCells = (moveCells) || DCoords.getLines(
      target.position,
      this.character.range,
      boardSize,
    );
    return personMoveCells.filter((item) => !targetMoveCells.includes(item));
  }
}
