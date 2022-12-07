import { PuzzleExample } from "../../types/examples";
import { readFileForDay } from "../../utils/io";
import { withSameInput } from "../../utils/testUtils";
import day07 from "./day07";

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      "$ cd /",
      "$ ls",
      "dir a",
      "14848514 b.txt",
      "8504156 c.dat",
      "dir d",
      "$ cd a",
      "$ ls",
      "dir e",
      "29116 f",
      "2557 g",
      "62596 h.lst",
      "$ cd e",
      "$ ls",
      "584 i",
      "$ cd ..",
      "$ cd ..",
      "$ cd d",
      "$ ls",
      "4060174 j",
      "8033020 d.log",
      "5626152 d.ext",
      "7214296 k",
    ],
    expected: 95437,
  },
  {
    input: readFileForDay("07"),
    expected: 1792222,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [24933642, 1112963]);

describe("Day 07 examples", () => {
  describe("Part one examples", () => {
    it.each(getPartOneExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day07.solvePartOne(input)).toBe(expected);
      }
    );
  });

  describe("Part two examples", () => {
    it.each(getPartTwoExamples())(
      "should return $expected",
      ({ input, expected }) => {
        expect(day07.solvePartTwo(input)).toBe(expected);
      }
    );
  });
});
