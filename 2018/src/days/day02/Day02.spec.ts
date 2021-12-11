import { readFileForDay } from '../../shared/fileToArray'
import Day1 from './Day02'

describe('Day01', () => {

  describe('Part 1', () => {

    it('returns the correct result for the test input', () => 
      expect(Day1.solvePartOne(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'])).toBe(12))

    it('returns the correct result for the actual input', () => expect(Day1.solvePartOne(readFileForDay(1))).toBe(5880))

  })
  
  describe('Part 2', () => {

    it('returns the correct result for the test input', () => 
      expect(Day1.solvePartTwo(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'])).toBe('fgij'))

    it('returns the correct result for the actual input', () => expect(Day1.solvePartTwo(readFileForDay(1))).toBe('tiwcdpbseqhxryfmgkvjujvza'))

  })

})