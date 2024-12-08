import { Day } from "../../types/day";
import { parseNumbers, parseSplitPair } from "../../utils/parsing";
import { sum } from "../../utils/reducers";

type Equation = {
  testValue: number;
  numbers: number[]
}

const parseEquation = (line: string): Equation => parseSplitPair(line, ':', (a, b) => ({ testValue: parseInt(a), numbers: parseNumbers(b) }))

const operations = ['+', '*'] as const

const isTestValuePossible = ({ testValue, numbers: [first, second, ...rest] }: Equation) => {
  if (!second || first > testValue) {
    return first === testValue
  }

  const next: Equation[] = []

  for (const operation of operations) {
    if (operation === '+') {
      next.push({ testValue, numbers: [first + second, ...rest] })
    } 
    
    if (operation === '*') {
      next.push({ testValue, numbers: [first * second, ...rest] })
    }    

  }

  return next.some(isTestValuePossible)
}



export default {
  solvePartOne: (input) => {

    return input.map(parseEquation).filter(isTestValuePossible).map(eq => eq.testValue).reduce(sum, 0)




    return 
  },
  solvePartTwo: (input) => {
    return ""
  },
} as Day;
