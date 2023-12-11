import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import { withSameInput } from '../../utils/testUtils';
import day11 from './day11';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`),
    expected: 374,
  },
  {
    input: readFileForDay('11'),
    expected: 9769724,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [82000210, 603020563700]);

describe('Day 11 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day11.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day11.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
