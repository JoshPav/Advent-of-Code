import { PuzzleExample } from "../../types/examples";
import day04 from "./day04";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"],
    expected: 2,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: ["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"],
    expected: 4,
  },
];

describe("Day 04 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day04.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day04.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
