import { Day } from "../../types/day";
import { sum } from "../../utils/reducers";

export default {
  solvePartOne: (input) => {
    const left: number[] = []
    const right: number[] = []

    input.forEach((line) => {
      const [l, r] = line.split(/\s+/)

      left.push(parseInt(l));
      right.push(parseInt(r));
  })

  left.sort()
  right.sort()

  const dists = left.map((l, i) => Math.abs(l - right[i]));

  return dists.reduce(sum)
  },
  solvePartTwo: (input) => {
    return ""
  },
} as Day;
