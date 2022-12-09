import { Day } from "../../types/day";
import { Vector, Point } from "../../types/geometry";
import {
  applyVector,
  clampVector,
  getDistances,
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

const applyMotionToRope = (head: RopeKnot, motion: Vector) => {
  head.position = applyVector(head.position, motion);

  head.visited.push(head.position);

  const tail = head.knotBehind;

  if (!tail) {
    return;
  }

  const { x, y } = getDistances(head.position, tail.position);

  if (Math.max(x, y) > 1) {
    const vectorToApply = clampVector({
      x: head.position.x - tail.position.x,
      y: head.position.y - tail.position.y,
    });

    applyMotionToRope(tail, vectorToApply);
    return;
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
  const motionVectors = motions.map(parseMotion);

  const { head, tail } = buildRopeWithKnots(numberOfKnots);

  motionVectors.forEach((motions) => {
    motions.forEach((motion) => {
      applyMotionToRope(head, motion);
      const foo = "";
    });
  });

  return getUniquePositionCount(tail.visited);
};

export default {
  solvePartOne: (input: string[]): string | number =>
    getUniqueTailPositionsForRope(input, 2),
  solvePartTwo: (input: string[]): string | number =>
    getUniqueTailPositionsForRope(input, 10),
} as Day;
