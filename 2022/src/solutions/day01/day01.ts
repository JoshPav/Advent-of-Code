import { Day } from "../../shared/day";

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
  }

  return snacksArr;
}

function getCaloriesCarried(arr: number[]): number {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

export default {
  solvePartOne: (input: string[]): string | number => {
    return getElfSnacks(input)
      .map(getCaloriesCarried)
      .reduce((prev, curr) => Math.max(prev, curr), 0);
  },
  solvePartTwo: (input: string[]): string | number => {
    const cals = getElfSnacks(input).map(getCaloriesCarried);

    cals.sort((a, b) => b - a);

    console.log(cals);
    return cals
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((prev, curr) => prev + curr, 0);
  },
} as Day;
