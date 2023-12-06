import { Day } from '../../types/day';
import { parseNumbers } from '../../utils/parsing';
import { product } from '../../utils/reducers';

type Race = {
  duration: number;
  recordDistance: number;
};

type RaceStrategy = {
  msHolding: number;
  distance: number;
};

const parseRaces = (lines: string[]): Race[] => {
  const times = parseNumbers(lines[0].split(':')[1]);
  const distances = parseNumbers(lines[1].split(':')[1]);

  const races = [];

  for (let i = 0; i < times.length; i++) {
    races.push({
      duration: times[i],
      recordDistance: distances[i],
    });
  }

  return races;
};

const calcDistance = (msHolding: number, raceDuration: number): number => {
  const msMoving = raceDuration - msHolding;
  return msMoving * msHolding;
};

const getRecordBreakingStrats = (race: Race): RaceStrategy[] => {
  const recordBeatingStrategies: RaceStrategy[] = [];

  for (let i = 0; i < race.duration; i++) {
    const element = race[i];

    const msHolding = i;
    const distanceTravelled = calcDistance(msHolding, race.duration);

    if (distanceTravelled > race.recordDistance) {
      recordBeatingStrategies.push({
        distance: distanceTravelled,
        msHolding,
      });
    }
  }

  return recordBeatingStrategies;
};

export default {
  solvePartOne: (input) => {
    const races = parseRaces(input);

    const allStrategies = races.map(getRecordBreakingStrats);

    return allStrategies
      .map((winningStrats) => winningStrats.length)
      .reduce(product, 1);
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
