import { PuzzleExample } from "../../types/examples";
import { readFileForDay } from "../../utils/io";
import day03 from './day03'

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ['xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'],
    expected: 161
  },
  {
    input: readFileForDay('03'),
    expected: 169021493
  }
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: [`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`],
    expected: 48
  },
  {
    input: readFileForDay('03'),
    expected: 111762583
  }
];

describe("Day 03 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return expected",
      ({ input, expected }) => {
        expect(day03.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return expected",
      ({ input, expected }) => {
        expect(day03.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});