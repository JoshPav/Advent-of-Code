import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import day08 from './day08';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`RL

  AAA = (BBB, CCC)
  BBB = (DDD, EEE)
  CCC = (ZZZ, GGG)
  DDD = (DDD, DDD)
  EEE = (EEE, EEE)
  GGG = (GGG, GGG)
  ZZZ = (ZZZ, ZZZ)`),
    expected: 2,
  },
  {
    input: splitAndTrim(`LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`),
    expected: 6,
  },
  {
    input: readFileForDay('08'),
    expected: 19241,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`LR

  11A = (11B, XXX)
  11B = (XXX, 11Z)
  11Z = (11B, XXX)
  22A = (22B, XXX)
  22B = (22C, 22C)
  22C = (22Z, 22Z)
  22Z = (22B, 22B)
  XXX = (XXX, XXX)`),
    expected: 6,
  },
  {
    input: readFileForDay('08'),
    expected: undefined,
  },
];

describe('Day 08 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day08.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day08.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
