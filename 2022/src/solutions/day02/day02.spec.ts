import { PuzzleExample } from "../../types/examples";
import day02 from "./day02";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ["A Y", "B X", "C Z"],
    expected: 15,
  },
  {
    // 4 1 7 8 5 2 3 9 6
    input: ["A X", "B X", "C X", "A Y", "B Y", "C Y", "A Z", "B Z", "C Z"],
    expected: 45,
  },
  {
    input: ["A X"],
    expected: 4,
  },
  {
    input: ["B X"],
    expected: 1,
  },
  {
    input: ["C X"],
    expected: 7,
  },
  {
    input: ["A Y"],
    expected: 8,
  },
  {
    input: ["B Y"],
    expected: 5,
  },
  {
    input: ["C Y"],
    expected: 2,
  },
  {
    input: ["A Z"],
    expected: 3,
  },
  {
    input: ["B Z"],
    expected: 9,
  },
  {
    input: ["C Z"],
    expected: 6,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: getPartOneExamples()[0].input,
    expected: 12,
  },
];

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
