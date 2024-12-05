import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import day05 from './day05'

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: [
      '47|53',
      '97|13',
      '97|61',
      '97|47',
      '75|29',
      '61|13',
      '75|53',
      '29|13',
      '97|29',
      '53|29',
      '61|53',
      '97|53',
      '61|29',
      '47|13',
      '75|47',
      '97|75',
      '47|61',
      '75|61',
      '47|29',
      '75|13',
      '53|13',
      '',
      '75,47,61,53,29',
      '97,61,53,29,13',
      '75,29,13',
      '75,97,47,61,53',
      '61,13,29',
      '97,13,75,29,47',
    ],
    expected: 143
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [];
// const getPartTwoExamples = (): PuzzleExample[] => withSameInput(getPartOneExamples(), []);

describe('Day 05 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day05.solvePartOne(input)).toBe(expected)
    );

    it('should return expected for actual', () =>
      expect(day05.solvePartOne(readFileForDay('05'))).toBe(undefined));
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day05.solvePartTwo(input)).toBe(expected)
    );

  it('should return expected for actual', () =>
    expect(day05.solvePartTwo(readFileForDay('05'))).toBe(undefined));
  });
});