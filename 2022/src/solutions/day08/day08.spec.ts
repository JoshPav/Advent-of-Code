import { PuzzleExample } from "../../types/examples";
import { readFileForDay } from "../../utils/io";
import { withSameInput } from "../../utils/testUtils";
import day08 from "./day08";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ["30373", "25512", "65332", "33549", "35390"],
    expected: 21,
  },
  {
    input: readFileForDay("08"),
    expected: 1798,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [8, 259308]);

describe("Day 08 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day08.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day08.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
