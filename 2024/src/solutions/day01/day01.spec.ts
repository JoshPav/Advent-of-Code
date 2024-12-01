import { PuzzleExample } from "../../types/examples";
import { withSameInput } from "../../utils/testUtils";
import day01 from './day01'

const getPartOneExamples = (): PuzzleExample[] => [{
  input: [
  '3   4',
  '4   3',
  '2   5',
  '1   3',
  '3   9',
  '3   3'
],
expected: 11
}];

const getPartTwoExamples = (): PuzzleExample[] => withSameInput(getPartOneExamples(), [31]);

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