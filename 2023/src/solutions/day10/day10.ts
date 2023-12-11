import { Day } from '../../types/day';
import { Point } from '../../types/geometry';
import { getLast } from '../../utils/collections';
import {
  areEqual,
  getEast,
  getNorth,
  getSouth,
  getWest,
} from '../../utils/geometryUtils';
import { isWithinRange } from '../../utils/range';

type PipeType = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S';
type PipeMap = { map: PipeType[][]; start: Point };

const findStartCoords = (map: string[][]): Point => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'S') {
        return {
          x,
          y,
        };
      }
    }
  }
};

const parsePipeMap = (input: string[]): { map: PipeType[][]; start: Point } => {
  const map = input.map((line) => [...line] as PipeType[]);
  return {
    map,
    start: findStartCoords(map),
  };
};

type GetTouching = (point: Point) => Point[];

const getStartCoords = (map: PipeType[][], point: Point) => {
  const north = getNorth(point);
  const east = getEast(point);
  const south = getSouth(point);
  const west = getWest(point);

  const touching = [];

  if (['|', 'F', '7'].includes(map[north.y][north.x])) {
    touching.push(north);
  }
  if (['-', 'J', 'L'].includes(map[east.y][east.x])) {
    touching.push(east);
  }
  if (['|', 'L', 'J'].includes(map[south.y][south.x])) {
    touching.push(south);
  }
  if (['-', 'F', 'L'].includes(map[west.y][west.x])) {
    touching.push(west);
  }

  return touching;
};

const getTouchingCoords = (map: PipeType[][]) => {
  const withinBounds = (point: Point) =>
    isWithinRange({ start: 0, end: map.length })(point.y) &&
    isWithinRange({ start: 0, end: map[0].length })(point.x);

  return (point: Point): Point[] => {
    const pipeType = map[point.y][point.x];

    let coords: Point[];

    switch (pipeType) {
      // vertical pipe connecting north and south
      case '|':
        coords = [getNorth(point), getSouth(point)];
        break;
      // horizontal pipe connecting east and west
      case '-':
        coords = [getEast(point), getWest(point)];
        break;
      // 90-degree bend connecting north and east
      case 'L':
        coords = [getNorth(point), getEast(point)];
        break;
      // 90-degree bend connecting north and west
      case 'J':
        coords = [getNorth(point), getWest(point)];
        break;
      // 90-degree bend connecting south and west
      case '7':
        coords = [getSouth(point), getWest(point)];
        break;
      // 90-degree bend connecting south and east
      case 'F':
        coords = [getSouth(point), getEast(point)];
        break;
      // starting position
      case 'S':
        return getStartCoords(map, point);

      default:
        return [];
    }

    return coords.filter(withinBounds);
  };
};

const getNextCoord =
  (getTouching: GetTouching) => (point: Point, previous: Point) =>
    getTouching(point).filter((point) => !areEqual(previous, point))[0];

const getLoopPath = ({ map, start }: PipeMap) => {
  const getTouching = getTouchingCoords(map);
  const getNext = getNextCoord(getTouching);

  const path = [start, getTouching(start)[0]];

  while (!areEqual(getLast(path), start)) {
    const curr = getLast(path);
    const prev = path[path.length - 2];

    path.push(getNext(curr, prev));
  }

  return path;
};

export default {
  solvePartOne: (input) => {
    const loopPath = getLoopPath(parsePipeMap(input));
    // Minus 1 as origin appears twice
    return (loopPath.length - 1) / 2;
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
