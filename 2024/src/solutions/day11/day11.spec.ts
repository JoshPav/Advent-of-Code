import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { withSameInput } from '../../utils/testUtils';
import day11 from './day11';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ['125 17'],
    expected: 55312,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];

describe('Day 11', () => {
  describe('Part one', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day11.solvePartOne(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day11.solvePartOne(readFileForDay('11'))).toBe(199982));
  });

  describe('Part two', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day11.solvePartTwo(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day11.solvePartTwo(readFileForDay('11'))).toBe(undefined));
  });
});
