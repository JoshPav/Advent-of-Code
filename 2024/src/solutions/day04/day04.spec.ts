import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { withSameInput } from '../../utils/testUtils';
import day04 from './day04';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      'MMMSXXMASM',
      'MSAMXMSMSA',
      'AMXSXMAAMM',
      'MSAMASMSMX',
      'XMASAMXAMM',
      'XXAMMXXAMA',
      'SMSMSASXSS',
      'SAXAMASAAA',
      'MAMMMXMMMM',
      'MXMXAXMASX',
    ],
    expected: 18,
  },
  {
    input: [
      'SAASAAS',
      'AAAAAAA',
      'AAMMMAA',
      'SAMXMAS',
      'AAMMMAA',
      'AAAAAAA',
      'SAASAAS',
    ],
    expected: 8,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];
// const getPartTwoExamples = (): PuzzleExample[] => withSameInput(getPartOneExamples(), []);

describe('Day 04 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day04.solvePartOne(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day04.solvePartOne(readFileForDay('04'))).toBe(2554));
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day04.solvePartTwo(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day04.solvePartTwo(readFileForDay('04'))).toBe(undefined));
  });
});
