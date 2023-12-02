import { Day } from '../../types/day';
import { sum } from '../../utils/reducers';

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

const digitWordRegex = new RegExp(
  `(?=([0-9]|${stringNumbers.join('|')}))`,
  'g',
);

const processWord = (num: string): string => {
  if (num.length == 1) {
    return num;
  }

  return String(stringNumbers.indexOf(num) + 1);
};

const getNumberForLine =
  (regex: RegExp) =>
  (str: string): number => {
    const matches = Array.from(str.matchAll(regex), (m) => m[1]);

    return Number(
      processWord(matches[0]) + processWord(matches[matches.length - 1]),
    );
  };

export default {
  solvePartOne: (input) =>
    input.map(getNumberForLine(/([0-9])/g)).reduce(sum, 0),
  solvePartTwo: (input) =>
    input.map(getNumberForLine(digitWordRegex)).reduce(sum, 0),
} as Day;
