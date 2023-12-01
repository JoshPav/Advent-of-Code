import { Day } from '../../types/day';
import { sum } from '../../utils/reducers';

type StringMatcher = (string: string) => string[];

const digitRegex = new RegExp(/[0-9]/g);

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

const matchDigitsAndWords: StringMatcher = (str) =>
  Array.from(str.matchAll(digitWordRegex), (m) => m[1]);

const matchDigits: StringMatcher = (str) => str.match(digitRegex);

const getNumberForLine =
  (matchString: StringMatcher) =>
  (str: string): number => {
    const matches = matchString(str);

    return Number(
      processWord(matches[0]) + processWord(matches[matches.length - 1]),
    );
  };

export default {
  solvePartOne: (input: string[]): string | number =>
    input.map(getNumberForLine(matchDigits)).reduce(sum, 0),
  solvePartTwo: (input: string[]): string | number =>
    input.map(getNumberForLine(matchDigitsAndWords)).reduce(sum, 0),
} as Day;
