import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import day10 from './day10';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`.....
  .S-7.
  .|.|.
  .L-J.
  .....`),
    expected: 4,
  },
  {
    input: splitAndTrim(`..F7.
    .FJ|.
    SJ.L7
    |F--J
    LJ...`),
    expected: 8,
  },
  {
    input: readFileForDay('10'),
    expected: 6856,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`...........
  .S-------7.
  .|F-----7|.
  .||.....||.
  .||.....||.
  .|L-7.F-J|.
  .|..|.|..|.
  .L--J.L--J.
  ...........`),
    expected: 4,
  },
  {
    input: splitAndTrim(`..........
    .S------7.
    .|F----7|.
    .||....||.
    .||....||.
    .|L-7F-J|.
    .|..||..|.
    .L--JL--J.
    ..........`),
    expected: 4,
  },
  {
    input: splitAndTrim(`.F----7F7F7F7F-7....
    .|F--7||||||||FJ....
    .||.FJ||||||||L7....
    FJL7L7LJLJ||LJ.L-7..
    L--J.L7...LJS7F-7L7.
    ....F-J..F7FJ|L7L7L7
    ....L7.F7||L7|.L7L7|
    .....|FJLJ|FJ|F7|.LJ
    ....FJL-7.||.||||...
    ....L---J.LJ.LJLJ...`),
    expected: 8,
  },
  {
    input: splitAndTrim(`FF7FSF7F7F7F7F7F---7
    L|LJ||||||||||||F--J
    FL-7LJLJ||||||LJL-77
    F--JF--7||LJLJ7F7FJ-
    L---JF-JLJ.||-FJLJJ7
    |F|F-JF---7F7-L7L|7|
    |FFJF7L7F-JF7|JL---7
    7-L-JL7||F7|L7F-7F7|
    L.L7LFJ|||||FJL7||LJ
    L7JLJL-JLJLJL--JLJ.L`),
    expected: 10,
  },
];

describe('Day 10 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day10.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day10.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
