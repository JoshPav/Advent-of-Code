import { Day } from "../../types/day";
import { sum } from "../../utils/reducers";

const readLists = (input:  string[]) => {
  const left: number[] = []
  const right: number[] = []

    input.forEach((line) => {
      const [l, r] = line.split(/\s+/)

      left.push(parseInt(l));
      right.push(parseInt(r));
  })

  return [left, right]
}

export default {
  solvePartOne: (input) => {
  const [left, right] = readLists(input);

  left.sort()
  right.sort()

  const dists = left.map((l, i) => Math.abs(l - right[i]));

  return dists.reduce(sum)
  },
  solvePartTwo: (input) => {
    const [left, right] = readLists(input);

    const appearances = right.reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: (acc[curr] || 0) + 1
      };
    }, {})

    return left.map(num => num * (appearances[num] || 0)).reduce(sum)
  },
} as Day;
