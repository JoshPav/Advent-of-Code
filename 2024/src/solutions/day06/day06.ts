import { Grid } from '../../structures/grid';
import { MovingPoint } from '../../structures/movingPoint';
import { Point } from '../../structures/point';
import { Day, PuzzleInput } from '../../types/day';

type Map = string[][];

const parseMap = (input: PuzzleInput): { map: Grid; startPos: MovingPoint } => {
  let startPos: MovingPoint;

  return {
    map: new Grid(input, (str, { x, y }) => {
      if (str === '^') {
        startPos = new MovingPoint(x, y);
      }
      return str;
    }),
    startPos,
  };
};

const isOutOfBounds = (map: string[][]) => (pos: Point) =>
  pos.x < 0 || pos.y < 0 || pos.x >= map[0].length || pos.y >= map.length;

export type PointAndDirection = {
  x: number;
  y: number;
  dir: number;
};

// const getCopies = (map: Grid, path: Point[]): Record<string, Map> => {
//   return Object.fromEntries(
//     path.map((point) => {
//       const newMap = [...map.map((row) => [...row])];
//       newMap[point.y][point.x] = '#';
//       return [`${point.x},${point.y}`, newMap];
//     }),
//   );
// };

const followPath = (map: Grid) => (startPos: MovingPoint) => {
  let pos: MovingPoint = startPos;

  const path: MovingPoint[] = [startPos];
  const seen = new Set(startPos.toString());

  while (map.isWithin(pos)) {
    const nextPos = pos.move();

    if (seen.has(nextPos.toString())) {
      throw new Error();
    }

    if (map.get(nextPos) === '#') {
      pos = pos.turn(90);
    } else {
      pos = nextPos;
      path.push(pos);
      seen.add(pos.toString());
    }
  }

  return path;
};

export default {
  solvePartOne: (input) => {
    const { map, startPos } = parseMap(input);

    return (
      new Set(followPath(map)(startPos).map((pos) => `${pos.x},${pos.y}`))
        .size - 1
    );
  },
  solvePartTwo: (input) => {
    // const { map, startPos } = parseMap(input)
    // const path = followPath(map)(startPos);
    // const [first, ...rest] = path;
    // const copies = getCopies(map, rest);
    // return Object.values(copies).filter((copy) => {
    //   try {
    //     followPath(copy)(startPos);
    //   } catch (err) {
    //     return true;
    //   }
    //   return false;
    // }).length;
  },
} as Day;
