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
    const attack = this.character.attack;
    const defence = target.character.defence;
    return Math.round(Math.max(attack - defence, attack * 0.1));
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
