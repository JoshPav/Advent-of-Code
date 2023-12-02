import { Day } from '../../types/day';
import { sum } from '../../utils/reducers';

type DrawnCubes = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: string;
  cubesRevealed: DrawnCubes[];
};

const parseRound = (round: string): DrawnCubes => {
  const cubesDrawn = round.split(',');

  const drawnCubes: DrawnCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  cubesDrawn.forEach((drawn) => {
    const [count, color] = drawn.trim().split(' ');

    drawnCubes[color] = Number(count);
  });

  return drawnCubes;
};

const parseLine = (line: string): Game => {
  const [id, details] = line.split(':');

  const rounds = details.split(';');

  return {
    id: id.replace('Game ', ''),
    cubesRevealed: rounds.map(parseRound),
  };
};

const getTotalCubesForColor = (color: keyof DrawnCubes, game: Game): number => {
  return game.cubesRevealed.map((revealed) => revealed[color]).reduce(sum, 0);
};

const isGamePossible =
  (total: DrawnCubes) =>
  (game: Game): boolean => {
    return game.cubesRevealed.every((round) => {
      return (
        round.red <= total.red &&
        round.blue <= total.blue &&
        round.green <= total.green
      );
    });
  };

export default {
  solvePartOne: (input: string[]): string | number => {
    const games = input.map(parseLine);

    const totalAllowed: DrawnCubes = {
      red: 12,
      green: 13,
      blue: 14,
    };

    const possible = games.filter(isGamePossible(totalAllowed));

    return possible.map(({ id }) => Number(id)).reduce(sum, 0);
  },
  solvePartTwo: (input: string[]): string | number => {
    return '';
  },
} as Day;
