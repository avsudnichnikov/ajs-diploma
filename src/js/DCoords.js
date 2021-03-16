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
    const min = {
      x: Math.max(coordsPers.x - dist, 0),
      y: Math.max(coordsPers.y - dist, 0)
    };
    const max = {
      x: Math.min(coordsPers.x + dist, boardSize - 1),
      y: Math.min(coordsPers.y + dist, boardSize - 1)
    };
    for (let x = min.x; x <= max.x; x += 1) {
      for (let y = min.y; y <= max.y; y += 1) {
        const coordsItem = {x, y};
        const distance = this.distance(coordsItem, coordsPers);
        if ((distance <= dist) && (distance > 0)) {
          positions.push(this.coordsToPos(coordsItem, boardSize));
        }
      }
    }
    return positions;
  }
}
