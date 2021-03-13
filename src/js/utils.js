export function randInt(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export function intDiv(a, b) {
  return (a - a % b) / b;
}

export function addZeros(number, order) {
  if (order <= 1) return '' + number;
  return addZeros(intDiv(number, 10), order - 1) + number % 10;
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

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
