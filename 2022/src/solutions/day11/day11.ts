import { Day } from "../../types/day";
import { splitOnEmptyLines } from "../../utils/parsing";
import { funcSortDesc } from "../../utils/sort";
import { Monkey, parseMonkeyNote } from "./day11Parser";

const processRound = (
  monkeys: Monkey[],
  manageWorryLevel: (worryLevel: number) => number
): void => {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];

    for (let itemI = 0; itemI < monkey.items.length; itemI++) {
      const item = monkey.items[itemI];

      let itemWorryLevel = manageWorryLevel(monkey.inspectItem(item));

      const nextMonkey = monkey.getNextMonkey(itemWorryLevel);

      monkeys[nextMonkey].items.push(itemWorryLevel);

      monkey.inspected += 1;
    }

    monkey.items = [];
  }
};

const getLevelOfMonkeyBusiness = (
  monkeys: Monkey[],
  roundsToProcess: number,
  manageWorryLevel: (worryLevel: number) => number
): number => {
  for (let i = 0; i < roundsToProcess; i++) {
    processRound(monkeys, manageWorryLevel);
  }

  return funcSortDesc(monkeys.map((monkey) => monkey.inspected))
    .slice(0, 2)
    .reduce((prev, curr) => prev * curr, 1);
};

export default {
  solvePartOne: (monkeyNotes: string[]): string | number => {
    return getLevelOfMonkeyBusiness(
      splitOnEmptyLines(monkeyNotes).map(parseMonkeyNote),
      20,
      (itemWorryLevel) => Math.floor(itemWorryLevel / 3)
    );
  },
  solvePartTwo: (monkeyNotes: string[]): string | number => {
    const monkeys = splitOnEmptyLines(monkeyNotes).map(parseMonkeyNote);

    // Divide by LCM of divisors to keep under control
    // Since all divisors are prime the LCM is just the product
    const lcm = monkeys
      .map((monkey) => monkey.divisor)
      .reduce((prev, curr) => prev * curr, 1);

    return getLevelOfMonkeyBusiness(
      monkeys,
      10000,
      (itemWorryLevel) => itemWorryLevel % lcm
    );
  },
} as Day;
