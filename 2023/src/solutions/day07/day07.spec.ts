import { PuzzleExample } from '../../types/examples';
import { splitAndTrim } from '../../utils/parsing';
import day07 from './day07';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`32T3K 765
  T55J5 684
  KK677 28
  KTJJT 220
  QQQJA 483`),
    expected: 6440,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];

describe('Day 07 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day07.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day07.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
