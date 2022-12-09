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

export default {
  solvePartOne: (input: string[]): string | number => {
    const motions = input.map(parseMotion);

    let headPoint = { x: 0, y: 0 };
    let tailPoint = { x: 0, y: 0 };

    const tailPositions = [tailPoint];

    motions.forEach((motion) => {
      const singleStepMotions = toSingleStepMotions(motion);

      singleStepMotions.forEach((singleMotion) => {
        headPoint = applyMotion(headPoint, singleMotion);

        if (!isTouching(headPoint, tailPoint)) {
          // Move tail
          if (
            !(
              isSameRow(headPoint, tailPoint) && isSameCol(headPoint, tailPoint)
            )
          ) {
            if (
              singleMotion.direction === Direction.DOWN ||
              singleMotion.direction === Direction.UP
            ) {
              // We need to move Left or right
              const diff = headPoint.x - tailPoint.x;
              tailPoint = applyMotion(tailPoint, {
                direction: Direction.RIGHT,
                amount: diff,
              });
            } else {
              // We need to move Left or right
              const diff = headPoint.y - tailPoint.y;
              tailPoint = applyMotion(tailPoint, {
                direction: Direction.UP,
                amount: diff,
              });
            }

            // We are diagonally off so need to adjust
            tailPoint = applyMotion(tailPoint, singleMotion);
            tailPositions.push(tailPoint);
          } else {
            // Will always want to do at least the same
            tailPoint = applyMotion(tailPoint, singleMotion);
            tailPositions.push(tailPoint);
          }
        }
      });
    });

    const unique = new Set(tailPositions.map(({ x, y }) => `x${x}y${y}`));

    return unique.size;
  },
  solvePartTwo: (input: string[]): string | number => {
    return "";
  },
} as Day;
