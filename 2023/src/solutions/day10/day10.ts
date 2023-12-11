import { Day } from '../../types/day';
import { Point } from '../../types/geometry';
import { areEqual } from '../../utils/geometryUtils';
import { isWithinRange } from '../../utils/range';

type PipeType = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S';

type PipeMap = PipeType[][];

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

const getTouchingCoords = (map: PipeMap) => {
  const getNorth = ({ x, y }: Point): Point => ({ x, y: y - 1 });
  const getEast = ({ x, y }: Point): Point => ({ x: x + 1, y });
  const getSouth = ({ x, y }: Point): Point => ({ x, y: y + 1 });
  const getWest = ({ x, y }: Point): Point => ({ x: x - 1, y });

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

      default:
        return [];
    }

    return coords.filter(withinBounds);
  };
};

const getNextCoord =
  (getTouching: GetTouching) => (point: Point, previous: Point) =>
    getTouching(point).filter((point) => !areEqual(previous, point))[0];

export default {
  solvePartOne: (input) => {
    const { start, map } = parsePipeMap(input);

    const getTouching = getTouchingCoords(map);
    const getNext = getNextCoord(getTouching);

    let distance = 1;
    let dirAPrev = start;
    let dirBPrev = start;

    let [dirACoord, dirBCoord] = getTouching(start);

    while (!areEqual(dirACoord, dirBCoord)) {
      const prevATemp = dirAPrev;
      const prevBTemp = dirBPrev;

      // Update previous
      dirAPrev = dirACoord;
      dirBPrev = dirBCoord;

      // Update current
      dirACoord = getNext(dirACoord, prevATemp);
      dirBCoord = getNext(dirBCoord, prevBTemp);

      distance++;
    }

    return distance;
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
