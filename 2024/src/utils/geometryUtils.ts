import { Point, Vector } from '../types/geometry';

export const origin = (): Point => ({ x: 0, y: 0 });

export const getManhattanDistance = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export const areAdjacent = (a: Point, b: Point): boolean => {
  return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
};

export const areEqual = (a: Point, b: Point) =>
  isSameRow(a, b) && isSameCol(a, b);

export const isSameRow = ({ y: aY }: Point, { y: bY }: Point): boolean => {
  return aY === bY;
};

export const isSameCol = ({ x: aX }: Point, { x: bX }: Point): boolean => {
  return aX === bX;
};

export const clampVector = (
  { x, y }: Vector,
  min: number = -1,
  max: number = 1,
): Point => {
  return {
    x: Math.min(Math.max(x, min), max),
    y: Math.min(Math.max(y, min), max),
  };
};

export const getDistances = (
  { x: aX, y: aY }: Point,
  { x: bX, y: bY }: Point,
): Vector => ({
  x: Math.abs(aX - bX),
  y: Math.abs(aY - bY),
});

export const applyVector = (
  { x, y }: Point,
  { x: xDir, y: yDir }: Vector,
): Point => {
  return {
    x: x + xDir,
    y: y + yDir,
  };
};

export const getNorth = ({ x, y }: Point): Point => ({ x, y: y - 1 });
export const getEast = ({ x, y }: Point): Point => ({ x: x + 1, y });
export const getSouth = ({ x, y }: Point): Point => ({ x, y: y + 1 });
export const getWest = ({ x, y }: Point): Point => ({ x: x - 1, y });
