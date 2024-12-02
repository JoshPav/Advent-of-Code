import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { withSameInput } from '../../utils/testUtils';
import day02 from './day02';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      '7 6 4 2 1',
      '1 2 7 8 9',
      '9 7 6 2 1',
      '1 3 2 4 5',
      '8 6 4 4 1',
      '1 3 6 7 9',
    ],
    expected: 2,
  },
  {
    input: readFileForDay('02'),
    expected: 218,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [4, 290]);

describe('Day 02 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day02.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day02.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
