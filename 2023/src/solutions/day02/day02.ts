import { Day } from '../../types/day';
import { sum, sumNested } from '../../utils/reducers';

const zeroCubes: Cubes = {
  red: 0,
  green: 0,
  blue: 0,
};

type Cubes = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  cubesRevealed: Cubes[];
};

const parseDrawnColor = (drawn: string) => {
  const [count, color] = drawn.trim().split(' ');
  return [color, Number(count)];
};

const parseRound = (round: string): Cubes => {
  return {
    // Spread 0 case to handle missing cubes
    ...zeroCubes,
    ...Object.fromEntries(round.split(',').map(parseDrawnColor)),
  };
};

const parseGame = (line: string): Game => {
  const [id, gameDetails] = line.split(':');

  return {
    id: Number(id.replace('Game ', '')),
    cubesRevealed: gameDetails.split(';').map(parseRound),
  };
};

const hasEnoughCubes = (total: Cubes) => (round: Cubes, color: keyof Cubes) =>
  round[color] <= total[color];

const isGamePossible =
  (total: Cubes) =>
  (game: Game): boolean => {
    const hasEnough = hasEnoughCubes(total);

    return game.cubesRevealed.every(
      (round) =>
        hasEnough(round, 'red') &&
        hasEnough(round, 'blue') &&
        hasEnough(round, 'green'),
    );
  };

const getMinRequiredReducer = (prev: Cubes, curr: Cubes): Cubes => ({
  red: Math.max(prev.red, curr.red),
  green: Math.max(prev.green, curr.green),
  blue: Math.max(prev.blue, curr.blue),
});

const getMinRequired = ({ cubesRevealed }: Game): Cubes =>
  cubesRevealed.reduce(getMinRequiredReducer, zeroCubes);

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
      .map(parseGame)
      .filter(isGamePossible(totalAllowed))
      .reduce(sumNested('id'), 0);
  },
  solvePartTwo: (input: string[]): string | number => {
    return input
      .map(parseGame)
      .map(getMinRequired)
      .map(getCubePowers)
      .reduce(sum, 0);
  },
} as Day;
