export default class DCoords {
  static coordsToPos(coords, boardSize) {
    return coords.x + coords.y * boardSize;
  }

  static posToCoords(index, boardSize) {
    const x = index % boardSize;
    const y = (index - x) / boardSize;
    return { x, y };
  }

  static distance(coordsA, coordsB, math = true, round = true) {
    const projectionX = Math.abs(coordsA.x - coordsB.x);
    const projectionY = Math.abs(coordsA.y - coordsB.y);
    let dist;
    if (math) {
      dist = Math.sqrt(projectionX ** 2 + projectionY ** 2);
    } else {
      dist = Math.max(projectionX, projectionY);
    }
    return (round) ? Math.round(dist) : dist;
  }

  static distancePos(posA, posB, boardSize, math = true, round = true) {
    const coordsCell = DCoords.posToCoords(posA, boardSize);
    const coordsPers = DCoords.posToCoords(posB, boardSize);
    return DCoords.distance(coordsCell, coordsPers, math, round);
  }

  static getArea(position, dist, math, boardSize) {
    const positions = [];
    const coordsCenter = this.posToCoords(position, boardSize);
    const min = {
      x: Math.max(coordsCenter.x - dist, 0),
      y: Math.max(coordsCenter.y - dist, 0),
    };
    const max = {
      x: Math.min(coordsCenter.x + dist, boardSize - 1),
      y: Math.min(coordsCenter.y + dist, boardSize - 1),
    };
    for (let { x } = min; x <= max.x; x += 1) {
      for (let { y } = min; y <= max.y; y += 1) {
        const coordsItem = { x, y };
        if (this.distance(coordsItem, coordsCenter, math) <= dist) {
          positions.push(this.coordsToPos(coordsItem, boardSize));
        }
      }
    }
    return positions;
  }
}
