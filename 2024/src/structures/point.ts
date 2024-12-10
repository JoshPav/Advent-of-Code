import { Predicate } from '../utils/predicate';
import {
  DIRECTIONS,
  Vector,
} from './vector';

export class Point {
  static origin(): Point {
    return new Point(0, 0);
  }

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

  getManhattanDistance({ x, y }: Point) {
    return Math.abs(this.x - x) + Math.abs(this.y - y);
  }

  isAdjacent({ x, y }: Point) {
    return Math.abs(this.x - x) <= 1 && Math.abs(this.y - y) <= 1;
  }

  isEqual(point: Point) {
    return this.isSameRow(point) && this.isSameCol(point);
  }

  isSameRow({ y: y }: Point): boolean {
    return this.y === y;
  }

  isSameCol({ x }: Point): boolean {
    return this.x === x;
  }

  getVector({ x, y }: Point) {
    return new Vector(x - this.x, y - this.y);
  }

  getDistances(point: Point) {
    return this.getVector(point).abs();
  }

  applyVector({ x, y }: Vector) {
    return new Point(this.x + x, this.y + y);
  }

  public getCardinalAdjacent(filter?: Predicate<Point>) {
    return this.getAdjacent(false, filter);
  }

  public getAllAdjacent(filter?: Predicate<Point>) {
    return this.getAdjacent(true, filter);
  }

  private getAdjacent(
    includeIntercardinal: boolean,
    filter: Predicate<Point> = () => true,
  ) {
    return Object.values(DIRECTIONS).reduce((points: Point[], dir, i) => {
        if (includeIntercardinal || i % 2 === 0) {
          points.push(this.applyVector(dir));
        }
        return points;
      }, [])
      .filter(filter);
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}
