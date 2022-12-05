import { PuzzleExample } from "../../types/examples";
import { readFileForDay } from "../../utils/io";
import { withSameInput } from "../../utils/testUtils";
import day02 from "./day02";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ["A Y", "B X", "C Z"],
    expected: 15,
  },
  {
    input: readFileForDay("02"),
    expected: 8392,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [12, 10116]);

describe("Day 02 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day02.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day02.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
