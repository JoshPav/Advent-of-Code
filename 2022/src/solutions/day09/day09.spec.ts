import { PuzzleExample } from "../../types/examples";
import day09 from "./day09";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"],
    expected: 13,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];

describe("Day 09 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day09.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day09.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
