import { PuzzleExample } from "../../types/examples";
import day01 from "./day01";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      "1000",
      "2000",
      "3000",
      "",
      "4000",
      "",
      "5000",
      "6000",
      "",
      "7000",
      "8000",
      "9000",
      "",
      "10000",
    ],
    expected: 24000,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => {
  const input = getPartOneExamples()[0].input;
  return [
    {
      input,
      expected: 45000,
    },
  ];
};

describe("Day 01 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day01.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day01.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
