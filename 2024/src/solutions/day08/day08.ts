import { Day, PuzzleInput } from '../../types/day';
import { Point } from '../../structures/point';
import { Predicate } from '../../utils/predicate';
import { isWithinRange } from '../../utils/range';

const parseInput = (input: PuzzleInput): Record<string, Point[]> => {
  const antennas: Record<string, Point[]> = {};

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const element = input[y][x];

      if (element !== '.') {
        antennas[element] = [...(antennas[element] || []), new Point(x, y)];
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

      const vect = start.getVector(end);

      antinodes.push(end.applyVector(vect), start.applyVector(vect.inverse()));
    }
  }

  return antinodes;
};

const getAntinodesPt2 = (
  antennas: Point[],
  isInMap: Predicate<Point>,
): Point[] => {
  const antinodes = [];

  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      const start = antennas[i];
      const end = antennas[j];

      const vect = start.getVector(end);
      const inverseVect = vect.inverse();

      antinodes.push(start, end);

      let nextStart = start.applyVector(inverseVect);
      while (isInMap(nextStart)) {
        antinodes.push(nextStart);

        nextStart = nextStart.applyVector(inverseVect);
      }

      let nextEnd = end.applyVector(vect);
      while (isInMap(nextEnd)) {
        antinodes.push(nextEnd);

        nextEnd = nextEnd.applyVector(vect);
      }
    }
  }

  return antinodes;
};

export default {
  solvePartOne: (input) => {
    const nodes = parseInput(input);

    const isInMap = (point: Point) =>
      isWithinRange({ start: 0, end: input.length - 1 })(point.y) &&
      isWithinRange({ start: 0, end: input[0].length - 1 })(point.x);

    const points = Object.entries(nodes)
      .flatMap(([freq, antennas]) => getAntinodes(antennas))
      .filter(isInMap)
      .map(({ x, y }) => `${x},${y}`);

    return new Set(points).size;
  },
  solvePartTwo: (input) => {
    const nodes = parseInput(input);

    const isInMap = (point: Point) =>
      isWithinRange({ start: 0, end: input.length - 1 })(point.y) &&
      isWithinRange({ start: 0, end: input[0].length - 1 })(point.x);

    const points = Object.entries(nodes)
      .flatMap(([freq, antennas]) => getAntinodesPt2(antennas, isInMap))
      .map(({ x, y }) => `${x},${y}`);

    return new Set(points).size;
  },
} as Day;
