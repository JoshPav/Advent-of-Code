import { Day, PuzzleInput } from '../../types/day';
import { Point } from '../../types/geometry';
import {
  getEast,
  getNorth,
  getSouth,
  getWest,
} from '../../utils/geometryUtils';
import { isWithinRange } from '../../utils/range';

const parseMap = (input: PuzzleInput) => {
  const trailheads: Point[] = [];

  const map = input.map((line) => line.split('').map(Number));

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        trailheads.push({ x, y });
      }
    }
  }

  return {
    map,
    trailheads,
  };
};

const IsWithinMap = (map: number[][]) => (point: Point) =>
  isWithinRange({ start: 0, end: map.length - 1 })(point.y) &&
  isWithinRange({ start: 0, end: map[0].length - 1 })(point.x);

const dirs = [getNorth, getEast, getSouth, getWest];

const getValidMoves = (map: number[][]) => {
  const isWithinMap = IsWithinMap(map);

  return (point: Point) =>
    dirs
      .map((getNext) => getNext(point))
      .filter(isWithinMap)
      .filter(
        ({ x: nextX, y: nextY }) =>
          map[nextY][nextX] - map[point.y][point.x] === 1,
      );
};

const findEndPoints =
  (map: number[][]) =>
  (curr: Point): Point[] => {
    if (map[curr.y][curr.x] === 9) {
      return [curr];
    }

    const nextMoves = getValidMoves(map)(curr);

    // console.log({ curr, nextMoves });

    return nextMoves.flatMap((next) => findEndPoints(map)(next));
  };

export default {
  solvePartOne: (input) => {
    const { map, trailheads } = parseMap(input);

    const ends = trailheads.flatMap((start) =>
      findEndPoints(map)(start).map((end) => [start, end]),
    );

    // console.log({ trailheads });

    // console.log({ ends });

    return new Set(
      ends.map(([start, end]) => `${start.x},${start.y},${end.x},${end.y}`),
    ).size;
  },
  solvePartTwo: (input) => {
    return undefined;
  },
} as Day;
