import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import { withSameInput } from '../../utils/testUtils';
import day09 from './day09';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`0 3 6 9 12 15
  1 3 6 10 15 21
  10 13 16 21 30 45`),
    expected: 114,
  },
  {
    input: readFileForDay('09'),
    expected: undefined,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [2]);

describe('Day 09 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day09.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day09.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
