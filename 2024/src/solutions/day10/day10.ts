import { Day, PuzzleInput } from '../../types/day';
import { Point } from '../../structures/point';
import { Grid, Parser } from '../../structures/grid';

const parseMap = (input: PuzzleInput) => {
  const trailheads: Point[] = [];

  const parseHeight: Parser<number> = (val, point) => {
    const height = parseInt(val);
    if (height === 0) {
      trailheads.push(point);
    }
    return height;
  };

  const map = new Grid(input, parseHeight);

  return {
    map,
    trailheads,
  };
};

const getValidMoves = (map: Grid<number>, point: Point) =>
  point
    .getCardinalAdjacent((p) => map.isWithin(p))
    .filter((next) => map.get(next) - map.get(point) === 1);

const findEndPoints =
  (map: Grid<number>) =>
  (curr: Point): Point[] => {
    if (map.get(curr) === 9) {
      return [curr];
    }

    return getValidMoves(map, curr).flatMap(findEndPoints(map));
  };

export default {
  solvePartOne: (input) => {
    const { map, trailheads } = parseMap(input);

    return new Set(
      trailheads.flatMap((start) =>
        findEndPoints(map)(start).map((end) => `${start},${end}`),
      ),
    ).size;
  },
  solvePartTwo: (input) => {
    const { map, trailheads } = parseMap(input);

    return trailheads.flatMap(findEndPoints(map)).length;
  },
} as Day;
