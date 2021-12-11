import { readFileForDay } from '../../shared/fileToArray'
import Day1 from './Day01'

describe('Day01', () => {

  describe('Part 1', () => {

    it('returns the correct result for the test input', () => expect(Day1.solvePartOne(['-1', '-2', '-3'])).toBe(-6))

    it('returns the correct result for the actual input', () => expect(Day1.solvePartOne(readFileForDay(1))).toBe(595))

  })
  
  describe('Part 2', () => {

    it('returns the correct result for the test input', () => expect(Day1.solvePartTwo(['+7', '+7', '-2', '-7', '-4'])).toBe(14))

    it('returns the correct result for the actual input', () => expect(Day1.solvePartTwo(readFileForDay(1))).toBe(80598))

  })

})