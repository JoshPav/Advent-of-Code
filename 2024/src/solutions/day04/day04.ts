import { Grid } from '../../structures/grid';
import { Point } from '../../structures/point';
import { DIRECTIONS, Vector } from '../../structures/vector';
import { Day, PuzzleInput } from '../../types/day';

const parseInput = (input: PuzzleInput): Grid<string> =>  new Grid(input)

const check =
  (grid: Grid) =>
  (
    p: Point,
    dir: Vector,
    [toMatch, ...rest]: string[],
  ) =>
    grid.get(p) === toMatch &&
    (!rest.length || check(grid)(p.applyVector(dir), dir, rest));

const isXmas = (grid: Grid) => (middle: Point) => {
  return (
    (check(grid)(middle.applyVector(DIRECTIONS.NORTH_WEST), DIRECTIONS.SOUTH_EAST, ['M', 'A', 'S']) ||
      check(grid)(middle.applyVector(DIRECTIONS.NORTH_WEST), DIRECTIONS.SOUTH_EAST, ['S', 'A', 'M'])) &&
    (check(grid)(middle.applyVector(DIRECTIONS.NORTH_EAST),  DIRECTIONS.SOUTH_WEST, ['M', 'A', 'S']) ||
      check(grid)(middle.applyVector(DIRECTIONS.NORTH_EAST), DIRECTIONS.SOUTH_WEST, ['S', 'A', 'M']))
  );
};

export default {
  solvePartOne: (input) => {
    const grid = new Grid(input)

    let count = 0;

    const checkOnGrid = check(grid);

    const letters = 'XMAS'.split('');

    grid.forEach((_, point) => {
      Object.values(DIRECTIONS).forEach((move) => {
        if (checkOnGrid(point, move, letters)) {
          count += 1;
        }
      });
    })

    return count;
  },
  solvePartTwo: (input) => {
    const grid = parseInput(input);

    let count = 0;

    grid.forEach((val, point) => {
      if (val === 'A' && isXmas(grid)(point)) {
        count += 1;
      }
    })

    return count;
  },
} as Day;
