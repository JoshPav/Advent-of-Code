import { Day } from '../../types/day';
import { parseRhs, parseRhsNumbers, splitOnSpaces } from '../../utils/parsing';
import { product } from '../../utils/reducers';

type Race = {
  duration: number;
  recordDistance: number;
};

type RaceStrategy = {
  msHolding: number;
  distance: number;
};

const parseRaces = ([timesInput, distancesInput]: string[]): Race[] => {
  const times = parseRhsNumbers(timesInput);
  const distances = parseRhsNumbers(distancesInput);

  const races = [];

  for (let i = 0; i < times.length; i++) {
    races.push({
      duration: times[i],
      recordDistance: distances[i],
    });
  }

  return races;
};

const calcDistance = (msHolding: number, raceDuration: number): number =>
  (raceDuration - msHolding) * msHolding;

const getStrategyBoundary = (
  { duration, recordDistance }: Race,
  getMsHolding: (duration: number, i: number) => number,
): RaceStrategy => {
  for (let i = 1; i < duration; i++) {
    const msHolding = getMsHolding(duration, i);
    const distanceTravelled = calcDistance(msHolding, duration);

    if (distanceTravelled > recordDistance) {
      return {
        distance: distanceTravelled,
        msHolding,
      };
    }
  }

  return undefined;
};

const getFirstValidStrategy = (race: Race): RaceStrategy =>
  getStrategyBoundary(race, (_, i) => i);

const getLastValidStrategy = (race: Race): RaceStrategy =>
  getStrategyBoundary(race, (duration, i) => duration - i);

const parseSingleRace = ([splitTimes, splitDistances]: string[]): Race => ({
  duration: Number.parseInt(parseRhs(splitTimes).join('')),
  recordDistance: Number.parseInt(parseRhs(splitDistances).join('')),
});

/**
 * Winning strategies will be a continuous period. We only need to find the start and
 * end of this period. We can then assume all in the middle are also winning.
 */
const getNumberOfWinningStrategies = (race: Race): number =>
  getLastValidStrategy(race).msHolding -
  getFirstValidStrategy(race).msHolding +
  1;

export default {
  solvePartOne: (input) =>
    parseRaces(input).map(getNumberOfWinningStrategies).reduce(product, 1),
  solvePartTwo: (input) => getNumberOfWinningStrategies(parseSingleRace(input)),
} as Day;
