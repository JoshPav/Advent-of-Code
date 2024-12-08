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

export const getVector = (
  { x: startX, y: startY }: Point,
  { x: endX, y: endY }: Point,
): Vector => ({
  x: endX - startX,
  y: endY - startY,
});

export const getDistances = (a: Point, b: Point): Vector => {
  const { x, y } = getVector(a, b);
  return {
    x: Math.abs(x),
    y: Math.abs(y),
  };
};

export const inverse = ({ x, y }: Vector): Vector => ({
  x: x * -1,
  y: y * -1,
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

export const getNorthEast = ({ x, y }: Point): Point => ({
  x: x + 1,
  y: y - 1,
});
export const getNortWest = ({ x, y }: Point): Point => ({ x: x - 1, y: y - 1 });
export const getSouthEast = ({ x, y }: Point): Point => ({
  x: x + 1,
  y: y + 1,
});
export const getSouthWest = ({ x, y }: Point): Point => ({
  x: x - 1,
  y: y + 1,
});

export const getAllAdjancent = (p: Point) => [
  getNorth(p),
  getEast(p),
  getSouth(p),
  getWest(p),
  getNorthEast(p),
  getNortWest(p),
  getSouthEast(p),
  getSouthWest(p),
];
