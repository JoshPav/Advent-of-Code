import { PuzzleInput } from '../../types/day';
import { PuzzleExample } from '../../types/examples';
import { Point } from '../../types/geometry';
import { readFileForDay } from '../../utils/io';
import { withSameInput } from '../../utils/testUtils';
import day08 from './day08';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      '............',
      '........0...',
      '.....0......',
      '.......0....',
      '....0.......',
      '......A.....',
      '............',
      '............',
      '........A...',
      '.........A..',
      '............',
      '............',
    ],
    expected: 14,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => withSameInput(getPartOneExamples(), [34]);

describe('Day 08', () => {
  describe('Part one', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day08.solvePartOne(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day08.solvePartOne(readFileForDay('08'))).toBe(301));
  });

  describe('Part two', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day08.solvePartTwo(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day08.solvePartTwo(readFileForDay('08'))).toBe(undefined));
  });
});
