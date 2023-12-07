import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import { withSameInput } from '../../utils/testUtils';
import day07, { getOptimalHand } from './day07';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`32T3K 765
  T55J5 684
  KK677 28
  KTJJT 220
  QQQJA 483`),
    expected: 6440,
  },
  {
    input: readFileForDay('07'),
    expected: 252656917,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [5905]);

describe('Day 07 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day07.solvePartOne(input)).toBe(expected);
      },
    );
  });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day07.solvePartTwo(input)).toBe(expected);
      },
    );
  });

  describe('getOptimalHand', () => {
    it.each([
      { input: 'AAAAA', expected: 'AAAAA' },
      { input: '12345', expected: '12345' },
      { input: 'JJJJJ', expected: 'AAAAA' },
      { input: '1234J', expected: '12344' },
      { input: 'KQJQQ', expected: 'KQQQQ' },
      { input: '99JJ9', expected: '99999' },
      { input: '8JJJJ', expected: '88888' },
      { input: '95JJ8', expected: '95998' },
      { input: 'KJJ69', expected: 'KKK69' },
      { input: 'JJKK7', expected: 'KKKK7' },
      { input: '44JJ4', expected: '44444' },
      { input: 'AJJ63', expected: 'AAA63' },
      { input: 'QJQJJ', expected: 'QQQQQ' },
      { input: 'A6JJ9', expected: 'A6AA9' },
      { input: 'KKJJQ', expected: 'KKKKQ' },
      { input: 'QQJJQ', expected: 'QQQQQ' },
      { input: '99JJ9', expected: '99999' },
      { input: '33JJ3', expected: '33333' },
      { input: '338JJ', expected: '33833' },
      { input: 'JJ6T5', expected: 'TT6T5' },
      { input: 'JJ5AA', expected: 'AA5AA' },
      { input: 'JJQK9', expected: 'KKQK9' },
      { input: 'JJ278', expected: '88278' },
      { input: 'JJ5AQ', expected: 'AA5AQ' },
      { input: 'K34JJ', expected: 'K34KK' },
      { input: '222JJ', expected: '22222' },
      { input: 'JJJJ3', expected: '33333' },
    ])('it should return the expected', ({ input, expected }) => {
      expect(getOptimalHand(input)).toEqual(expected);
    });
  });
});
