import { Day, PuzzleInput } from "../../types/day";
import { isWithinRange } from "../../utils/range";

type Report = {
  levels: number[]
}

const parseInput = (input: PuzzleInput): Report[] => 
  input.map(line => ({
    levels: line.split(/\s+/).map(Number)
  }))

const getDiffs = (arr: number[]) => {
  const diffs = []
  for (let i = 0; i < arr.length - 1; i++) {
    diffs.push(arr[i] - arr[i + 1])
  }
  return diffs;
}

const isInSafeRange = isWithinRange({ start: 1, end: 3 })

const isSafe = ({ levels }: Report) => {
  const diffs = getDiffs(levels)

  const diffSafe = diffs.every(diff => isInSafeRange(Math.abs(diff)))

  const isDesc = diffs.every(num => num > 0)
  const isAsc = diffs.every(num => num < 0)


  return diffSafe && (isDesc || isAsc)
}

export default {
  solvePartOne: (input) => {
    const reports = parseInput(input);

    return reports.filter(isSafe).length
  },
  solvePartTwo: (input) => {
    return ""
  },
} as Day;
