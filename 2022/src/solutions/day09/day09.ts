import { parse } from "path";
import { Day } from "../../types/day";

enum Direction {
  UP = "U",
  RIGHT = "R",
  DOWN = "D",
  LEFT = "L",
}

type Point = {
  x: number;
  y: number;
};

type RopeMotion = {
  direction: Direction;
  amount: number;
};

type RopeKnot = {
  position: Point;
  knotBehind?: RopeKnot;
  logPositions?: boolean;
};

const parseMotion = (motion: string): RopeMotion => {
  const [dir, amount] = motion.split(" ");
  return {
    amount: parseInt(amount),
    direction: dir as Direction,
  };
};

const isTouching = (a: Point, b: Point): boolean => {
  const xDiff = Math.abs(a.x - b.x);
  const yDiff = Math.abs(a.y - b.y);

  return xDiff <= 1 && yDiff <= 1;
};

const isSameRow = ({ y: aY }: Point, { y: bY }: Point): boolean => {
  return aY === bY;
};

const isSameCol = ({ x: aX }: Point, { x: bX }: Point): boolean => {
  return aX === bX;
};

const applyMotion = (
  { x, y }: Point,
  { amount, direction }: RopeMotion
): Point => {
  switch (direction) {
    case Direction.UP:
      return { x, y: y + amount };
    case Direction.DOWN:
      return { x, y: y - amount };
    case Direction.RIGHT:
      return { x: x + amount, y };
    case Direction.LEFT:
      return { x: x - amount, y };
  }
};

const toSingleStepMotions = ({
  amount,
  direction,
}: RopeMotion): RopeMotion[] => {
  const singleStepMotions: RopeMotion[] = [];

  for (let i = 0; i < amount; i++) {
    singleStepMotions.push({ amount: 1, direction });
  }

  return singleStepMotions;
};

const applyMotionToRope = (
  head: RopeKnot,
  motion: RopeMotion,
  tailPositions: Point[]
) => {
  console.log("called");

  head.position = applyMotion(head.position, motion);

  const tail = head.knotBehind;

  if (tail && !isTouching(head.position, tail.position)) {
    // Move tail
    if (
      !(
        isSameRow(head.position, tail.position) &&
        isSameCol(head.position, tail.position)
      )
    ) {
      if (
        motion.direction === Direction.DOWN ||
        motion.direction === Direction.UP
      ) {
        // We need to move Left or right
        const diff = head.position.x - tail.position.x;

        applyMotionToRope(
          head.knotBehind,
          {
            direction: Direction.RIGHT,
            amount: diff,
          },
          tailPositions
        );
      } else {
        // We need to move Left or right
        const diff = head.position.y - tail.position.y;
        applyMotionToRope(
          head.knotBehind,
          {
            direction: Direction.UP,
            amount: diff,
          },
          tailPositions
        );
      }

      // We are diagonally off so need to adjust
      applyMotionToRope(head.knotBehind, motion, tailPositions);

      if (head.knotBehind.logPositions) {
        console.log("poo");

        tailPositions.push(head.knotBehind.position);
      }
    } else {
      applyMotionToRope(head.knotBehind, motion, tailPositions);

      if (head.knotBehind.logPositions) {
        console.log("poo");

        tailPositions.push(head.knotBehind.position);
      }
    }
  }
};

const buildRopeWithKnots = (numberOfKnots: number): RopeKnot => {
  const head: RopeKnot = {
    position: { x: 0, y: 0 },
  };

  let currKnot: RopeKnot = head;

  for (let index = 0; index < numberOfKnots - 1; index++) {
    currKnot.knotBehind = {
      position: {
        x: 0,
        y: 0,
      },
    };

    if (index === numberOfKnots - 2) {
      currKnot.knotBehind.logPositions = true;
    } else {
      currKnot = currKnot.knotBehind;
    }
  }

  return head;
};

export default {
  solvePartOne: (input: string[]): string | number => {
    const motions = input.map(parseMotion);

    // let head: RopeKnot = {
    //   position: { x: 0, y: 0 },
    //   knotBehind: {
    //     position: { x: 0, y: 0 },
    //     logPositions: true,
    //   },
    // };

    const head = buildRopeWithKnots(2);

    const tailPositions = [{ ...head.knotBehind.position }];

    motions.forEach((motion) => {
      const singleStepMotions = toSingleStepMotions(motion);

      singleStepMotions.forEach((singleMotion) => {
        applyMotionToRope(head, singleMotion, tailPositions);
      });
    });

    const unique = new Set(tailPositions.map(({ x, y }) => `x${x}y${y}`));

    return unique.size;
  },
  solvePartTwo: (input: string[]): string | number => {
    return "";
  },
} as Day;
