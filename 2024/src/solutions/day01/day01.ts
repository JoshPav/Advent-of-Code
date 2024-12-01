import { Day, PuzzleInput } from '../../types/day';
import { groupByCount, sum } from '../../utils/reducers';

const readListsAndSort = (input: PuzzleInput) => {
  const left: number[] = [];
  const right: number[] = [];

  input.forEach((line) => {
    const [l, r] = line.split(/\s+/);

    left.push(parseInt(l));
    right.push(parseInt(r));
  });

  return [left.sort(), right.sort()];
};

const readMaps = (input: PuzzleInput) => {
  const left: Record<string, number> = {};
  const right: Record<string, number> = {};

  input.forEach((line) => {
    const [l, r] = line.split(/\s+/);

    left[l] = (left[l] || 0) + 1;
    right[r] = (right[r] || 0) + 1;
  });

  return [left, right];
};

export default {
  solvePartOne: (input) => {
    const [left, right] = readListsAndSort(input);

    return left.map((l, i) => Math.abs(l - right[i])).reduce(sum);
  },
  solvePartTwo: (input) => {
    const [left, right] = readMaps(input);

    return Object.keys(left)
      .map((key) => {
        const num = parseInt(key);
        return num * left[num] * (right[num] || 0);
      })
      .reduce(sum);
  },
} as Day;
