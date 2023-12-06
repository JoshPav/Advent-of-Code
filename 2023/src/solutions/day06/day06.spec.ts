import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import { withSameInput } from '../../utils/testUtils';
import day06 from './day06';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`Time:      7  15   30
    Distance:  9  40  200`),
    expected: 288,
  },
  {
    input: readFileForDay('06'),
    expected: 393120,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [71503]);

describe('Day 06 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day06.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day06.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
