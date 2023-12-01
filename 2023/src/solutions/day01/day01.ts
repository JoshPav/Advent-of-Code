import { Day } from '../../types/day';
import { sum } from '../../utils/reducers';

const getDigits = (str: string): string[] => {
  const chars = [...str];

  return chars.filter((c) => c.toLowerCase() == c.toUpperCase());
};

const conactFirstAndLast = (arr: string[]): number =>
  Number(arr[0] + arr[arr.length - 1]);

const stringNumbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getFirstDigit = (str: string): number =>
  getDigitForFunction(str, (str, search) => str.indexOf(search)).sort(
    (a, b) => a.index - b.index,
  )[0].val;

const getLastDigit = (str: string): number =>
  getDigitForFunction(str, (str, search) => str.lastIndexOf(search)).sort(
    (a, b) => b.index - a.index,
  )[0].val;

const getDigitForFunction = (
  str: string,
  getIndex: (str: string, search: string) => number,
) => {
  const wordIndexes = stringNumbers
    .map((wordNum, i) => ({
      val: i + 1,
      index: getIndex(str, wordNum),
    }))
    .filter((a) => a.index >= 0);

  const digitIndexes = numbers
    .map((digit) => ({
      val: digit,
      index: getIndex(str, `${digit}`),
    }))
    .filter((a) => a.index >= 0);

  return [...wordIndexes, ...digitIndexes];
};

export default {
  solvePartOne: (input: string[]): string | number => {
    return input.map(getDigits).map(conactFirstAndLast).reduce(sum, 0);
  },
  solvePartTwo: (input: string[]): string | number => {
    return input
      .map((str) => {
        return Number(`${getFirstDigit(str)}${getLastDigit(str)}`);
      })
      .reduce(sum, 0);
  },
} as Day;
