import { Point } from './point';
import { isWithinRange } from '../utils/range';

type RowParser = (row: string) => string[];
const defaultParser: RowParser = (str) => str.split('');

export type Parser<T> = (val: string, point: Point) => T;

export class Grid<T = string> implements Iterable<T> {
  private grid: T[][];

  constructor(input: string[], parser?: Parser<T>, rowParser?: RowParser) {
    this.grid = this.parseGrid(input, parser, rowParser);
  }

  forEach(callbackfn: (value: T, index: Point, grid: Grid<T>) => void) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const p = new Point(x, y);
        callbackfn(this.get(p), p, this);
      }
    }
  }

  [Symbol.iterator](): Iterator<T, any, any> {
    let grid = this.grid;

    let y = 0;
    let x = 0;

    return {
      next() {
        x++;
        if (x === grid[0].length) {
          y++;
          x = 0;
        }

        return {
          value: grid[y][x],
          done: y > grid.length,
        };
      },
    };
  }

  private parseGrid(
    input: string[],
    parser: Parser<T> = (val) => val as T,
    rowParser: RowParser = defaultParser,
  ) {
    const grid = [];

    for (let y = 0; y < input.length; y++) {
      const row = rowParser(input[y]);
      const parsedRow: T[] = [];

      for (let x = 0; x < row.length; x++) {
        const element = row[x];

        parsedRow.push(parser(element, new Point(x, y)));
      }

      grid.push(parsedRow);
    }

    return grid;
  }

  get width() {
    return this.grid[0].length;
  }

  get height() {
    return this.grid.length;
  }

  public get({ x, y }: Point): T {
    return this.grid[y]?.[x];
  }

  public set({ x, y }: Point, val: T) {
    this.grid[y][x] = val;
  }

  public getRow(y: number): T[] {
    return this.grid[y];
  }

  public getColumn(x: number): T[] {
    const col = [];

    for (let y = 0; y < this.height; y++) {
      col.push(this.get(new Point(x, y)));
    }

    return col;
  }

  public isWithin({ x, y }: Point): boolean {
    return (
      isWithinRange({ start: 0, end: this.width - 1 })(x) &&
      isWithinRange({ start: 0, end: this.height - 1 })(y)
    );
  }
}
