import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { withSameInput } from '../../utils/testUtils';
import day06 from './day06';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      '....#.....',
      '.........#',
      '..........',
      '..#.......',
      '.......#..',
      '..........',
      '.#..^.....',
      '........#.',
      '#.........',
      '......#...',
    ],
    expected: 41,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [6]);

describe('Day 06', () => {
  describe('Part one', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day06.solvePartOne(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day06.solvePartOne(readFileForDay('06'))).toBe(4789));
  });

  describe('Part two', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day06.solvePartTwo(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day06.solvePartTwo(readFileForDay('06'))).toBe(1304));
  });
});
