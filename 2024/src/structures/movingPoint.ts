import { Point } from './point';
import { DIRECTIONS } from './vector';

const compass = {
  0: DIRECTIONS.NORTH,
  45: DIRECTIONS.NORTH_EAST,
  90: DIRECTIONS.EAST,
  135: DIRECTIONS.SOUTH_EAST,
  180: DIRECTIONS.SOUTH,
  225: DIRECTIONS.SOUTH_WEST,
  270: DIRECTIONS.WEST,
  315: DIRECTIONS.NORTH_WEST,
};

export class MovingPoint extends Point {
  private bearing: number;

  constructor(x: number, y: number, dir = 0) {
    super(x, y);
    this.bearing = dir;
  }

  move() {
    const { x, y } = this.applyVector(compass[this.bearing]);
    return new MovingPoint(x, y, this.bearing);
  }

  turn(degrees: number) {
    return new MovingPoint(this.x, this.y, (this.bearing + degrees) % 360);
  }

  toString(): string {
    return `${super.toString()},${this.bearing}`;
  }
}
