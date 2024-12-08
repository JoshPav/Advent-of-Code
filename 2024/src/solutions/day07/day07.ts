import { Day } from '../../types/day';
import { get } from '../../utils/mappers';
import { Operation, sum, concat, mul } from '../../utils/math';
import { parseNumbers, parseSplitPair } from '../../utils/parsing';

type Equation = {
  testValue: number;
  numbers: number[];
};

const parseEquation = (line: string): Equation =>
  parseSplitPair(line, ':', (a, b) => ({
    testValue: parseInt(a),
    numbers: parseNumbers(b),
  }));

const isTestValuePossible =
  (operations: Operation[]) =>
  ({ testValue, numbers: [first, second, ...rest] }: Equation) => {
    if (!second || first > testValue) {
      return first === testValue;
    }

    for (const operation of operations) {
      const newEq = {
        testValue,
        numbers: [operation(first, second), ...rest],
      };

      if (isTestValuePossible(operations)(newEq)) {
        return true;
      }
    }

    return false;
  };

export default {
  solvePartOne: (input) =>
    input
      .map(parseEquation)
      .filter(isTestValuePossible([mul, sum]))
      .map(get('testValue'))
      .reduce(sum, 0),
  solvePartTwo: (input) =>
    input
      .map(parseEquation)
      .filter(isTestValuePossible([mul, sum, concat]))
      .map(get('testValue'))
      .reduce(sum, 0),
} as Day;
