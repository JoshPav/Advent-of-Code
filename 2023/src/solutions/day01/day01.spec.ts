import { PuzzleExample } from "../../types/examples";
import day01 from './day01'

const getPartOneExamples = (): PuzzleExample[] => [
  { input: [
  "1abc2",
"pqr3stu8vwx",
"a1b2c3d4e5f",
"treb7uchet"
  ], expected: 142 }
];

const getPartTwoExamples = (): PuzzleExample[] => [];

describe("Day 01 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return expected",
      ({ input, expected }) => {
        expect(day01.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return expected",
      ({ input, expected }) => {
        expect(day01.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});