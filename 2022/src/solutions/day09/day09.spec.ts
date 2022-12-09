import { PuzzleExample } from "../../types/examples";
import { readFileForDay } from "../../utils/io";
import { withSameInput } from "../../utils/testUtils";
import day09 from "./day09";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"],
    expected: 13,
  },
  {
    input: readFileForDay("09"),
    expected: 6337,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"],
    expected: 1,
  },
  {
    input: ["R 5", "U 8", "L 8", "D 3", "R 17", "D 10", "L 25", "U 20"],
    expected: 36,
  },
];
withSameInput(getPartOneExamples(), [1]);

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
