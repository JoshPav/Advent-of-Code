import { Day } from '../../types/day';
import { Point } from '../../types/geometry';
import { flipGrid } from '../../utils/collections';
import { getManhattanDistance } from '../../utils/geometryUtils';

type GalaxyCoordinates = Point;

type Galaxy = {
  galaxyMap: string[][];
  galaxyData: Record<string, GalaxyCoordinates>;
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

const printMap = (map: string[][]) =>
  console.log(map.map((line) => line.join('')).join('\n'));

const processGalaxyMap = (map: string[][]): string[][] =>
  flipGrid(processMap1D(flipGrid(processMap1D(map))));

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

const parseGalaxy = (image: string[]): Galaxy => {
  const galaxyMap = processGalaxyMap(image.map((line) => [...line]));

  return {
    galaxyData: getGalaxyData(galaxyMap),
    galaxyMap: galaxyMap,
  };
};

export default {
  solvePartOne: (input) => {
    const { galaxyMap, galaxyData } = parseGalaxy(input);

    // printMap(galaxyMap);
    // console.log(galaxyData);

    const galaxyCoordinates = Object.values(galaxyData);

    let total = 0;

    for (let i = 0; i < galaxyCoordinates.length; i++) {
      for (let j = i; j < galaxyCoordinates.length; j++) {
        total += getManhattanDistance(
          galaxyCoordinates[i],
          galaxyCoordinates[j],
        );
      }
    }

    return total;
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
