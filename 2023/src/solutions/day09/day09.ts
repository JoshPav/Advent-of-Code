import { Day } from '../../types/day';
import { getLast } from '../../utils/collections';
import { parseNumbers } from '../../utils/parsing';
import { sum } from '../../utils/reducers';

const getDifferences = (numbers: number[]): number[] =>
  numbers.slice(1).map((num, index) => num - numbers[index]);

const getAllDifferences = (numbers: number[]): number[][] => {
  const differences = [[...numbers]];

  let nextSequence: number[];

  do {
    nextSequence = getDifferences(differences[differences.length - 1]);
    differences.push(nextSequence);
  } while (!nextSequence.every((num) => num === 0));
  return differences;
};

const getNextSequenceValue = (sequences: number[][]): number => {
  let toAdd = 0;

  for (let i = sequences.length - 1; i >= 0; i--) {
    toAdd = getLast(sequences[i]) + toAdd;
  }

  return toAdd;
};

export default {
  solvePartOne: (input) => {
    const sequences = input.map(parseNumbers);

    const idk = sequences.map(getAllDifferences);

    return idk.map(getNextSequenceValue).reduce(sum, 0);
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
