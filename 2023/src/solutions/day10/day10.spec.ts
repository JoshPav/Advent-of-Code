import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import day10 from './day10';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`.....
  .S-7.
  .|.|.
  .L-J.
  .....`),
    expected: 4,
  },
  {
    input: splitAndTrim(`..F7.
    .FJ|.
    SJ.L7
    |F--J
    LJ...`),
    expected: 8,
  },
  {
    input: readFileForDay('10'),
    expected: 6856,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];

describe('Day 10 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day10.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day10.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
