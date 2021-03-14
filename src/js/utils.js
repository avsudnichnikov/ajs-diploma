export function randInt(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export function coordsToIndex(coords, boardSize) {
  return coords.x + coords.y * boardSize
}

export function indexToCoords(index, boardSize) {
  const x = index % boardSize;
  const y = (index - x) / boardSize;
  return {x, y}
}

export function distance(coordsA, coordsB) {
  return Math.round(Math.max(Math.abs(coordsA.x - coordsB.x), Math.abs(coordsA.y - coordsB.y)))
}

export function calcTileType(index, boardSize) {
  const coords = indexToCoords(index, boardSize);
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
