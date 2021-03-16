export default class DCoords {
  static coordsToPos(coords, boardSize) {
    return coords.x + coords.y * boardSize;
  }

  static posToCoords(index, boardSize) {
    const x = index % boardSize;
    const y = (index - x) / boardSize;
    return {x, y};
  }

  static distance(coordsA, coordsB) {
    return Math.round(Math.max(Math.abs(coordsA.x - coordsB.x), Math.abs(coordsA.y - coordsB.y)));
  }

  static getArea(position, dist, boardSize) {
    const positions = [];
    const coordsPers = this.posToCoords(position, boardSize);
    const minX = Math.max(coordsPers.x - dist, 0);
    const maxX = Math.min(coordsPers.x + dist, boardSize - 1);
    const minY = Math.max(coordsPers.y - dist, 0);
    const maxY = Math.min(coordsPers.y + dist, boardSize - 1);
    for (let col = minX; col <= maxX; col += 1) {
      for (let row = minY; row <= maxY; row += 1) {
        const coordsItem = {x: col, y: row};
        const distance = this.distance(coordsItem, coordsPers);
        if ((distance <= dist) && (distance > 0)) {
          positions.push(this.coordsToPos(coordsItem, boardSize));
        }
      }
    }
    return positions;
  }
}
