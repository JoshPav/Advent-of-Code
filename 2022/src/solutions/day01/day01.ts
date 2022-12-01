import { max, sum } from "../../utils/reducers";
import { funcSortDesc } from "../../utils/sort";
import { Day } from "../../types/day";

function getElfSnacks(input: string[]): number[][] {
  const snacksArr = [];

  let currArr = [];
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    if (curr === "") {
      snacksArr.push(currArr);
      currArr = [];
    } else {
      currArr.push(parseInt(curr));
    }

    if (i === input.length - 1) {
      snacksArr.push(currArr);
    }
  }
  return snacksArr;
}

function getCaloriesCarried(arr: number[]): number {
  return arr.reduce(sum, 0);
}

export default {
  solvePartOne: (input: string[]): string | number => {
    return getElfSnacks(input).map(getCaloriesCarried).reduce(max, 0);
  },
  solvePartTwo: (input: string[]): string | number => {
    const cals = getElfSnacks(input).map(getCaloriesCarried);

    return funcSortDesc(cals).slice(0, 3).reduce(sum, 0);
  },
} as Day;
