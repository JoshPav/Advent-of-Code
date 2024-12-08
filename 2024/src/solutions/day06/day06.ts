import { Day, PuzzleInput } from '../../types/day';
import { Point } from '../../types/geometry';
import {
  getEast,
  getNorth,
  getSouth,
  getWest,
} from '../../utils/geometryUtils';

type Map = string[][];

const parseMap = (input: PuzzleInput): string[][] =>
  input.map((line) => line.split(''));

const findGuard = (map: string[][]): PointAndDirection => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '^') {
        return { x, y, dir: 0 };
      }
    }
  }
  throw new Error();
};

const isOutOfBounds = (map: string[][]) => (pos: Point) =>
  pos.x < 0 || pos.y < 0 || pos.x >= map[0].length || pos.y >= map.length;

const dirs = [getNorth, getEast, getSouth, getWest];

export type PointAndDirection = {
  x: number;
  y: number;
  dir: number;
};

const getCopies = (map: Map, path: Point[]): Record<string, Map> => {
  return Object.fromEntries(
    path.map((point) => {
      const newMap = [...map.map((row) => [...row])];
      newMap[point.y][point.x] = '#';
      return [`${point.x},${point.y}`, newMap];
    }),
  );
};

const toString = ({ x, y, dir }: PointAndDirection) => `${x},${y},${dir}`;

const followPath = (map: Map) => (startPos: PointAndDirection) => {
  const isInMap = (pos: Point) => !isOutOfBounds(map)(pos);

  let pos: PointAndDirection = startPos;

  const path: PointAndDirection[] = [startPos];
  const seen = new Set(toString(startPos));

  while (isInMap(dirs[pos.dir](pos))) {
    const nextPos = dirs[pos.dir](pos);

    if (seen.has(toString({ ...nextPos, dir: pos.dir }))) {
      throw new Error();
    }

    if (map[nextPos.y][nextPos.x] === '#') {
      pos = { ...pos, dir: (pos.dir + 1) % 4 };
    } else {
      pos = { ...nextPos, dir: pos.dir };
      path.push(pos);
      seen.add(toString(pos));
    }
  }

  return path;
};

export default {
  solvePartOne: (input) => {
    const map = parseMap(input);
    const startPos = findGuard(map);

    return new Set(
      followPath(map)(findGuard(map)).map((pos) => `${pos.x},${pos.y}`),
    ).size;
  },
  solvePartTwo: (input) => {
    const map = parseMap(input);
    const startPos = findGuard(map);
    const path = followPath(map)(findGuard(map));

    const [first, ...rest] = path;

    const copies = getCopies(map, rest);

    return Object.values(copies).filter((copy) => {
      try {
        followPath(copy)(startPos);
      } catch (err) {
        return true;
      }

      return false;
    }).length;
  },
} as Day;
