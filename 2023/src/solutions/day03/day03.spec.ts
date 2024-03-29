import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import { withSameInput } from '../../utils/testUtils';
import day03 from './day03';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`),
    expected: 4361,
  },
  {
    input: readFileForDay('03'),
    expected: 525911,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [467835, 75805607]);

describe('Day 03 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day03.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day03.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
