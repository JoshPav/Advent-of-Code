import { Day } from '../../types/day';
import { sum } from '../../utils/reducers';

type Cubes = {
  red?: number;
  green?: number;
  blue?: number;
};

type Game = {
  id: string;
  cubesRevealed: Cubes[];
};

const parseRound = (round: string): Cubes => {
  return Object.fromEntries(
    round.split(',').map((drawn) => {
      const [count, color] = drawn.trim().split(' ');
      return [color, Number(count)];
    }),
  );
};

const parseLine = (line: string): Game => {
  const [id, details] = line.split(':');

  return {
    id: id.replace('Game ', ''),
    cubesRevealed: details.split(';').map(parseRound),
  };
};

const isGamePossible =
  (total: Cubes) =>
  (game: Game): boolean => {
    return game.cubesRevealed.every((round) => {
      return (
        (!round.red || round.red <= total.red) &&
        (!round.blue || round.blue <= total.blue) &&
        (!round.green || round.green <= total.green)
      );
    });
  };

const getMinRequired = (game: Game): Cubes => {
  return game.cubesRevealed.reduce(
    (prev, curr) => {
      const updated = { ...prev };

      if (curr.blue > updated.blue) {
        updated.blue = curr.blue;
      }

      if (curr.green > updated.green) {
        updated.green = curr.green;
      }

      if (curr.red > updated.red) {
        updated.red = curr.red;
      }

      return updated;
    },
    {
      red: 0,
      blue: 0,
      green: 0,
    },
  );
};

const getCubePowers = ({ red, blue, green }: Cubes): number =>
  red * blue * green;

export default {
  solvePartOne: (input: string[]): string | number => {
    const totalAllowed: Cubes = {
      red: 12,
      green: 13,
      blue: 14,
    };

    return input
      .map(parseLine)
      .filter(isGamePossible(totalAllowed))
      .map(({ id }) => Number(id))
      .reduce(sum, 0);
  },
  solvePartTwo: (input: string[]): string | number => {
    return input
      .map(parseLine)
      .map(getMinRequired)
      .map(getCubePowers)
      .reduce(sum, 0);
  },
} as Day;
