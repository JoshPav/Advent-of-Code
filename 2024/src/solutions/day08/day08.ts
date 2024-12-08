import { Day, PuzzleInput } from '../../types/day';
import { Point } from '../../types/geometry';
import {
  applyVector,
  getDistances,
  getVector,
  inverse,
} from '../../utils/geometryUtils';
import { isWithinRange } from '../../utils/range';

const parseInput = (input: PuzzleInput): Record<string, Point[]> => {
  const antennas: Record<string, Point[]> = {};

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const element = input[y][x];

      if (element !== '.') {
        antennas[element] = [...(antennas[element] || []), { x, y }];
      }
    }
  }

  return antennas;
};

const getAntinodes = (antennas: Point[]): Point[] => {
  const antinodes = [];

  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      const start = antennas[i];
      const end = antennas[j];

      const vect = getVector(start, end);

      antinodes.push(applyVector(end, vect), applyVector(start, inverse(vect)));
    }
  }

  return antinodes;
};

export default {
  solvePartOne: (input) => {
    const nodes = parseInput(input);

    const isInMap = (point: Point) =>
      isWithinRange({ start: 0, end: input.length  - 1})(point.y) &&
      isWithinRange({ start: 0, end: input[0].length - 1})(point.x);

    const coords = Object.entries(nodes)
      .flatMap(([freq, antennas]) => getAntinodes(antennas))
      .filter(isInMap)
      .map(({ x, y }) => `${x},${y}`);

    return new Set(coords).size;
  },
  solvePartTwo: (input) => {
    return undefined;
  },
} as Day;