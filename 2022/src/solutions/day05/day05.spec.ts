import { PuzzleExample } from "../../types/examples";
import day05 from "./day05";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      "    [D]",
      "[N] [C]",
      "[Z] [M] [P]",
      "1   2   3 ",
      "",
      "move 1 from 2 to 1",
      "move 3 from 1 to 3",
      "move 2 from 2 to 1",
      "move 1 from 1 to 2",
    ],
    expected: "CMZ",
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: getPartOneExamples()[0].input,
    expected: "MCD",
  },
];

describe("Day 05 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day05.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day05.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});