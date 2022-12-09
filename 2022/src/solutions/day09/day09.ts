import { groupEnd } from "console";
import { parse } from "path";
import { Day } from "../../types/day";
import { Vector, Point } from "../../types/geometry";
import {
  applyVector,
  areAdjacent,
  getManhattanDistance,
  isSameCol,
  isSameRow,
  origin,
} from "../../utils/geometryUtils";

enum Direction {
  UP = "U",
  RIGHT = "R",
  DOWN = "D",
  LEFT = "L",
}

const directionVectors: Record<Direction, Vector> = {
  U: { x: 0, y: 1 },
  R: { x: 1, y: 0 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
};

type RopeKnot = {
  position: Point;
  knotBehind?: RopeKnot;
  visited: Point[];
};

const parseMotion = (motion: string): Vector[] => {
  const [dir, amount] = motion.split(" ");
  return toSingleStepVectors(dir as Direction, parseInt(amount));
};

const toSingleStepVectors = (
  direction: Direction,
  amount: number
): Vector[] => {
  const vectors: Vector[] = [];

  for (let i = 0; i < amount; i++) {
    vectors.push(directionVectors[direction]);
  }

  return vectors;
};

const isSameRowOrCol = (a: Point, b: Point): boolean => {
  return isSameRow(a, b) || isSameCol(a, b);
};

const applyMotionToRope = (head: RopeKnot, motion: Vector) => {
  head.position = applyVector(head.position, motion);
  head.visited.push(head.position);

  const tail = head.knotBehind;

  if (tail) {
    if (
      getManhattanDistance(head.position, tail.position) == 2 &&
      isSameRowOrCol(head.position, tail.position)
    ) {
      applyMotionToRope(tail, motion);
      return;
    }

    // Move diagonally
    if (
      !areAdjacent(head.position, tail.position) &&
      !isSameRowOrCol(head.position, tail.position)
    ) {
      // Make this better

      const xDiff = head.position.x - tail.position.x;
      const yDiff = head.position.y - tail.position.y;

      const vectorToApply = {
        x: motion.x + (xDiff % 2),
        y: motion.y + (yDiff % 2),
      };

      applyMotionToRope(tail, vectorToApply);
      return;
    }
  }
};

const buildRopeWithKnots = (
  numberOfKnots: number
): { head: RopeKnot; tail: RopeKnot } => {
  const head: RopeKnot = {
    position: origin(),
    visited: [origin()],
  };

  let currKnot: RopeKnot = head;

  for (let index = 0; index < numberOfKnots - 1; index++) {
    currKnot.knotBehind = {
      position: origin(),
      visited: [origin()],
    };

    currKnot = currKnot.knotBehind;
  }

  return { head, tail: currKnot };
};

const getUniquePositionCount = (points: Point[]): number =>
  new Set(points.map(({ x, y }) => `x${x}y${y}`)).size;

const getUniqueTailPositionsForRope = (
  motions: string[],
  numberOfKnots: number
): number => {
  const motionVectors = motions.flatMap(parseMotion);

  const { head, tail } = buildRopeWithKnots(numberOfKnots);

  motionVectors.forEach((motion) => {
    applyMotionToRope(head, motion);
    // printGrid(6, head);
  });

  return getUniquePositionCount(tail.visited);
};

const printGrid = (size: number, rope: RopeKnot) => {
  const grid = addRopeToGrid(getGridToPrint(size), rope);

  const toPrint = grid.map((row) => row.join("")).join("\n");
  console.log(toPrint);
};

const getGridToPrint = (size: number): string[][] => {
  const grid: string[][] = [];

  for (let i = 0; i < size; i++) {
    const row: string[] = [];
    for (let j = 0; j < size; j++) {
      row.push(".");
    }
    grid.push(row);
  }
  return grid;
};

const addRopeToGrid = (grid: string[][], rope: RopeKnot): string[][] => {
  let currKnot = rope;
  const gridSize = grid.length;

  let i = 0;

  grid[gridSize - 1][0] = "s";

  while (currKnot) {
    const symbol = i === 0 ? "H" : !currKnot.knotBehind ? "T" : String(i);

    const row = gridSize - 1 - currKnot.position.y;
    const col = currKnot.position.x;

    grid[row][col] = symbol;
    currKnot = currKnot.knotBehind;
    i++;
  }

  return grid;
};

export default {
  solvePartOne: (input: string[]): string | number =>
    getUniqueTailPositionsForRope(input, 2),
  solvePartTwo: (input: string[]): string | number =>
    getUniqueTailPositionsForRope(input, 10),
  // solvePartTwo: (input: string[]): string | number => {
  //   const motions = input.map(parseMotion);

  //   const { head, tail } = buildRopeWithKnots(10);

  //   motions.forEach((motion) => {
  //     const singleStepMotions = toSingleStepVectors(motion);

  //     singleStepMotions.forEach((singleMotion) => {
  //       applyMotionToRope(head, directionVectors[singleMotion.direction]);
  //     });
  //   });

  //   const unique = new Set(tail.visited.map(({ x, y }) => `x${x}y${y}`));

  //   return unique.size;
  // },
} as Day;
