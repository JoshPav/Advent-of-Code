import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import day10 from './day10';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: ['0123', '1234', '8765', '9876'],
    expected: 1,
  },
  {
    input: [
      '...0...',
      '...1...',
      '...2...',
      '6543456',
      '7.....7',
      '8.....8',
      '9.....9',
    ],
    expected: 2,
  },
  {
    input: [
      '..90..9',
      '...1.98',
      '...2..7',
      '6543456',
      '765.987',
      '876....',
      '987....',
    ],
    expected: 4,
  },
  {
    input: [
      '10..9..',
      '2...8..',
      '3...7..',
      '4567654',
      '...8..3',
      '...9..2',
      '.....01',
    ],
    expected: 3,
  },
  {
    input: [
      '89010123',
      '78121874',
      '87430965',
      '96549874',
      '45678903',
      '32019012',
      '01329801',
      '10456732',
    ],
    expected: 36,
  },
];

const getPartTwoExamples = (): PuzzleExample[] => [
  {
    input: [
      '.....0.',
      '..4321.',
      '..5..2.',
      '..6543.',
      '..7..4.',
      '..8765.',
      '..9....',
    ],
    expected: 3,
  },
  {
    input: [
      '..90..9',
      '...1.98',
      '...2..7',
      '6543456',
      '765.987',
      '876....',
      '987....',
    ],
    expected: 13,
  },
  {
    input: ['012345', '123456', '234567', '345678', '4.6789', '56789.'],
    expected: 227,
  },
  {
    input: [
      '89010123',
      '78121874',
      '87430965',
      '96549874',
      '45678903',
      '32019012',
      '01329801',
      '10456732',
    ],
    expected: 81,
  },
];

describe('Day 10', () => {
  describe('Part one', () => {
    it.each(getPartOneExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day10.solvePartOne(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day10.solvePartOne(readFileForDay('10'))).toBe(489));
  });

  describe('Part two', () => {
    it.each(getPartTwoExamples())(
      'should return expected for example',
      ({ input, expected }) => expect(day10.solvePartTwo(input)).toBe(expected),
    );

    it('should return expected for actual', () =>
      expect(day10.solvePartTwo(readFileForDay('10'))).toBe(1086));
  });
});
