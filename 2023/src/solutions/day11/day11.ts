import { Day } from '../../types/day';
import { Point } from '../../types/geometry';
import { flipGrid } from '../../utils/collections';
import { getManhattanDistance } from '../../utils/geometryUtils';

type GalaxyCoordinates = Point;

type Galaxy = {
  galaxyData: Record<string, GalaxyCoordinates>;
  emptyRows: number[];
  emptyColumns: number[];
};

const hasNoGalaxies = (mapRow: string[]) =>
  mapRow.every((point) => point === '.');

const processMap1D = (map: string[][]): string[][] => {
  const withSpacesAdded = [];

  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    withSpacesAdded.push(row);

    if (hasNoGalaxies(row)) {
      withSpacesAdded.push(row);
    }
  }

  return withSpacesAdded;
};

const getGalaxyData = (map: string[][]): Record<string, GalaxyCoordinates> => {
  const data: Record<string, GalaxyCoordinates> = {};

  let nextId = 1;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        data[nextId] = {
          x,
          y,
        };
        nextId++;
      }
    }
  }

  return data;
};

const getEmptyIndexes = (map: string[][]): number[] => {
  const indexes = [];
  for (let i = 0; i < map.length; i++) {
    if (hasNoGalaxies(map[i])) {
      indexes.push(i);
    }
  }
  return indexes;
};

const parseGalaxy = (image: string[]): Galaxy => {
  const galaxyMap = image.map((line) => [...line]);

  return {
    galaxyData: getGalaxyData(galaxyMap),
    emptyRows: getEmptyIndexes(galaxyMap),
    emptyColumns: getEmptyIndexes(flipGrid(galaxyMap)),
  };
};

const getCumulativeGalaxyDistances = (
  { galaxyData, emptyColumns, emptyRows }: Galaxy,
  galaxyAge: number,
): number => {
  const galaxyCoordinates = Object.entries(galaxyData);

  let total = 0;

  for (let i = 0; i < galaxyCoordinates.length; i++) {
    for (let j = i + 1; j < galaxyCoordinates.length; j++) {
      const { x: xA, y: yA } = galaxyCoordinates[i][1];
      const { x: xB, y: yB } = galaxyCoordinates[j][1];

      const rowsCrossed = emptyRows.filter(
        (row) => Math.min(yA, yB) < row && row < Math.max(yA, yB),
      ).length;
      const columnsCrossed = emptyColumns.filter(
        (col) => Math.min(xA, xB) < col && col < Math.max(xA, xB),
      ).length;

      let distance = getManhattanDistance(
        galaxyCoordinates[i][1],
        galaxyCoordinates[j][1],
      );

      distance += Math.max(rowsCrossed, 0) * (galaxyAge - 1);
      distance += Math.max(columnsCrossed, 0) * (galaxyAge - 1);

      total += distance;
    }
  }

  return total;
};

export default {
  solvePartOne: (input) => getCumulativeGalaxyDistances(parseGalaxy(input), 2),
  solvePartTwo: (input) =>
    getCumulativeGalaxyDistances(parseGalaxy(input), 1000000),
} as Day;
