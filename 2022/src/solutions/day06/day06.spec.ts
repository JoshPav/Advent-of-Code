import { PuzzleExample } from "../../types/examples";
import { withSameInput } from "../../utils/testUtils";
import day06 from "./day06";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ["mjqjpqmgbljsphdztnvjfqwrcgsmlb"],
    expected: 7,
  },
  {
    input: ["bvwbjplbgvbhsrlpgdmjqwftvncz"],
    expected: 5,
  },
  {
    input: ["nppdvjthqldpwncqszvftbrmjlhg"],
    expected: 6,
  },
  {
    input: ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"],
    expected: 10,
  },
  {
    input: ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"],
    expected: 11,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [19, 23, 23, 29, 26]);

describe("Day 06 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day06.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day06.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
