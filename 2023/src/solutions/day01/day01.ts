import { Day } from "../../types/day";
import { sum } from "../../utils/reducers";

const getDigits = (str: string): string[] => {
  const chars = [...str]
  
  return chars.filter(c => c.toLowerCase() == c.toUpperCase())
}

const conactFirstAndLast = (arr: string[]): number => Number(arr[0] + arr[arr.length - 1])

export default {
  solvePartOne: (input: string[]): string | number => {
    return input.map(getDigits).map(conactFirstAndLast).reduce(sum, 0)
  },
  solvePartTwo: (input: string[]): string | number => {
    return ""
  },
} as Day;
