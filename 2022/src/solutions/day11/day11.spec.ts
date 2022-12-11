import { PuzzleExample } from "../../types/examples";
import { readFileForDay } from "../../utils/io";
import { withSameInput } from "../../utils/testUtils";
import day11 from "./day11";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      "Monkey 0:",
      "  Starting items: 79, 98",
      "  Operation: new = old * 19",
      "  Test: divisible by 23",
      "    If true: throw to monkey 2",
      "    If false: throw to monkey 3",
      "",
      "Monkey 1:",
      "  Starting items: 54, 65, 75, 74",
      "  Operation: new = old + 6",
      "  Test: divisible by 19",
      "    If true: throw to monkey 2",
      "    If false: throw to monkey 0",
      "",
      "Monkey 2:",
      "  Starting items: 79, 60, 97",
      "  Operation: new = old * old",
      "  Test: divisible by 13",
      "    If true: throw to monkey 1",
      "    If false: throw to monkey 3",
      "",
      "Monkey 3:",
      "  Starting items: 74",
      "  Operation: new = old + 3",
      "  Test: divisible by 17",
      "    If true: throw to monkey 0",
      "    If false: throw to monkey 1",
    ],
    expected: 10605,
  },
  {
    input: readFileForDay("11"),
    expected: 119715,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [2713310158, 18085004878]);

describe("Day 11 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day11.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day11.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
