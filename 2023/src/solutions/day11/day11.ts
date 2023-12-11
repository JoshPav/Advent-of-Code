import { Day } from '../../types/day';
import { Point } from '../../types/geometry';
import { flipGrid } from '../../utils/collections';
import { getManhattanDistance } from '../../utils/geometryUtils';

type GalaxyCoordinates = Point;

type Galaxy = {
  galaxyPositions: GalaxyCoordinates[];
  emptyRows: number[];
  emptyColumns: number[];
};

const hasNoGalaxies = (mapRow: string[]) =>
  mapRow.every((point) => point === '.');

const getGalaxyData = (map: string[][]): GalaxyCoordinates[] => {
  const data: GalaxyCoordinates[] = [];

  let nextId = 1;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        data.push({
          x,
          y,
        });
        nextId++;
      }
    }
  }

  return data;
};

const getEmptyIndexes = (map: string[][]): number[] =>
  map.reduce(
    (indexes, curr, index) =>
      hasNoGalaxies(curr) ? [...indexes, index] : indexes,
    [] as number[],
  );

const parseGalaxy = (image: string[]): Galaxy => {
  const galaxyMap = image.map((line) => [...line]);

  return {
    galaxyPositions: getGalaxyData(galaxyMap),
    emptyRows: getEmptyIndexes(galaxyMap),
    emptyColumns: getEmptyIndexes(flipGrid(galaxyMap)),
  };
};

const getDistancesBetweenGalaxies =
  (emptyRows: number[], emptyColumns: number[], galaxyAge: number) =>
  (galaxyOne: Point, galaxyTwo: Point): number => {
    const { x: xA, y: yA } = galaxyOne;
    const { x: xB, y: yB } = galaxyTwo;

    const rowsCrossed = emptyRows.filter(
      (row) => Math.min(yA, yB) < row && row < Math.max(yA, yB),
    ).length;
    const columnsCrossed = emptyColumns.filter(
      (col) => Math.min(xA, xB) < col && col < Math.max(xA, xB),
    ).length;

    let distance = getManhattanDistance(galaxyOne, galaxyTwo);

    distance += Math.max(rowsCrossed, 0) * (galaxyAge - 1);
    distance += Math.max(columnsCrossed, 0) * (galaxyAge - 1);

    return distance;
  };

const getCumulativeGalaxyDistances = (
  { galaxyPositions, emptyColumns, emptyRows }: Galaxy,
  galaxyAge: number,
): number => {
  let total = 0;

  const getDistances = getDistancesBetweenGalaxies(
    emptyRows,
    emptyColumns,
    galaxyAge,
  );

  for (let i = 0; i < galaxyPositions.length; i++) {
    for (let j = i + 1; j < galaxyPositions.length; j++) {
      total += getDistances(galaxyPositions[i], galaxyPositions[j]);
    }
  }

  return total;
};

export default {
  solvePartOne: (input) => getCumulativeGalaxyDistances(parseGalaxy(input), 2),
  solvePartTwo: (input) =>
    getCumulativeGalaxyDistances(parseGalaxy(input), 1000000),
} as Day;
