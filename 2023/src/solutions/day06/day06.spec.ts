import { PuzzleExample } from '../../types/examples';
import { splitAndTrim } from '../../utils/parsing';
import day06 from './day06';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`Time:      7  15   30
    Distance:  9  40  200`),
    expected: 288,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];

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
