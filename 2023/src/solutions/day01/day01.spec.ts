import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import day01 from './day01';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`1abc2
      pqr3stu8vwx
      a1b2c3d4e5f
      treb7uchet`),
    expected: 142,
  },
  {
    input: readFileForDay('01'),
    expected: 54940,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(
      `two1nine
      eightwothree
      abcone2threexyz
      xtwone3four
      4nineeightseven2
      zoneight234
      7pqrstsixteen`,
    ),
    expected: 281,
  },
  {
    input: readFileForDay('01'),
    expected: 54208,
  },
];

describe('Day 01 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return $expected',
      ({ input, expected }) => {
        expect(day01.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return $expected',
      ({ input, expected }) => {
        expect(day01.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
