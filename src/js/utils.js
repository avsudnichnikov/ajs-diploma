import DCoords from './DCoords';

export function calcTileType(index, boardSize) {
  const coords = DCoords.posToCoords(index, boardSize);
  let rowMode = '';
  let columnMode = '';

  if ((coords.x === 0) || (coords.x === boardSize - 1)) {
    columnMode = (coords.x === 0) ? 'left' : 'right';
  }

  if ((coords.y === 0) || (coords.y === boardSize - 1)) {
    rowMode = (coords.y === 0) ? 'top' : 'bottom';
  }

  if (rowMode && columnMode) {
    rowMode += '-';
  }

  return rowMode + columnMode || 'center';
}

export function getTooltipMsg(character) {
  return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
