import { Day } from '../../types/day';
import { Point } from '../../types/geometry';
import { flipGrid } from '../../utils/collections';
import { getManhattanDistance } from '../../utils/geometryUtils';
import { getRanges, isWithinRange } from '../../utils/range';
import { sum } from '../../utils/reducers';

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

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        data.push({
          x,
          y,
        });
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
    const ranges = getRanges(galaxyOne, galaxyTwo);

    const emptySpacesCrossed =
      emptyRows.filter(isWithinRange(ranges.y)).length +
      emptyColumns.filter(isWithinRange(ranges.x)).length;

    return (
      getManhattanDistance(galaxyOne, galaxyTwo) +
      emptySpacesCrossed * (galaxyAge - 1)
    );
  };

const getCumulativeGalaxyDistances = (
  { galaxyPositions, emptyColumns, emptyRows }: Galaxy,
  galaxyAge: number,
): number => {
  const getDistances = getDistancesBetweenGalaxies(
    emptyRows,
    emptyColumns,
    galaxyAge,
  );

  return galaxyPositions
    .flatMap((pos1, index) =>
      galaxyPositions.slice(index + 1).map((pos2) => getDistances(pos1, pos2)),
    )
    .reduce(sum, 0);
};

export default {
  solvePartOne: (input) => getCumulativeGalaxyDistances(parseGalaxy(input), 2),
  solvePartTwo: (input) =>
    getCumulativeGalaxyDistances(parseGalaxy(input), 1000000),
} as Day;
