import { PuzzleExample } from '../../types/examples';
import { splitAndTrim } from '../../utils/parsing';
import day02 from './day02';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`),
    expected: 8,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];

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
