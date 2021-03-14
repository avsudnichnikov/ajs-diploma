export function randInt(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export function calcTileType(index, boardSize) {
  let columnNumber = index % boardSize
  let rowNumber = (index - columnNumber) / boardSize;
  let rowMode = '';
  let columnMode = '';

  if ((rowNumber === 0) || (rowNumber === boardSize - 1)) {
    rowMode = (rowNumber === 0) ? 'top' : 'bottom';
  }

  if ((columnNumber === 0) || (columnNumber === boardSize - 1)) {
    columnMode = (columnNumber === 0) ? 'left' : 'right';
  }

  if (rowMode && columnMode) {
    rowMode += '-'
  }

  return rowMode + columnMode || 'center';
}

export function getTooltipMsg({level, attack, defence, health} = character) {
  return `🎖${level} ⚔${attack} 🛡${defence} ❤${health}`;
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
