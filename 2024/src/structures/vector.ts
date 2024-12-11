export class Vector {
  constructor(
    private _x: number,
    private _y: number,
  ) {}

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  inverse() {
    return new Vector(this.x * -1, this.y * -1);
  }

  abs() {
    return new Vector(Math.abs(this.x), Math.abs(this.y));
  }
}

export const DIRECTIONS = {
  NORTH: new Vector(0, -1),
  NORTH_EAST: new Vector(1, -1),
  EAST: new Vector(1, 0),
  SOUTH_EAST: new Vector(1, 1),
  SOUTH: new Vector(0, 1),
  SOUTH_WEST: new Vector(-1, 1),
  WEST: new Vector(-1, 0),
  NORTH_WEST: new Vector(-1, -1),
};
