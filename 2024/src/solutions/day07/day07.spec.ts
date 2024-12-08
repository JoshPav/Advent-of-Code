import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { withSameInput } from '../../utils/testUtils';
import day07 from './day07'

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      '190: 10 19',
      '3267: 81 40 27',
      '83: 17 5',
      '156: 15 6',
      '7290: 6 8 6 15',
      '161011: 16 10 13',
      '192: 17 8 14',
      '21037: 9 7 18 13',
      '292: 11 6 16 20',
    ],
    expected: 3749
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];
// const getPartTwoExamples = (): PuzzleExample[] => withSameInput(getPartOneExamples(), []);

describe('Day 07', () => {
  describe('Part one', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day07.solvePartOne(input)).toBe(expected)
    );

    it('should return expected for actual', () =>
      expect(day07.solvePartOne(readFileForDay('07'))).toBe(undefined));
  });

  describe('Part two', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day07.solvePartTwo(input)).toBe(expected)
    );

  it('should return expected for actual', () =>
    expect(day07.solvePartTwo(readFileForDay('07'))).toBe(undefined));
  });
});