import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { withSameInput } from '../../utils/testUtils';
import day01 from './day01';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'],
    expected: 11,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [31]);

describe('Day 01', () => {
  describe('Part one', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => {
        expect(day01.solvePartOne(input)).toBe(expected);
      },
    );

    it('should return expected for actual', () =>
      expect(day01.solvePartOne(readFileForDay('01'))).toBe(2031679));
  });

  describe('Part two', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => {
        expect(day01.solvePartTwo(input)).toBe(expected);
      },
    );

    it('should return expected for actual', () =>
      expect(day01.solvePartTwo(readFileForDay('01'))).toBe(19678534));
  });
});
