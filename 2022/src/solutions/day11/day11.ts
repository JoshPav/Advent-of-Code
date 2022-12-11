import { Day } from "../../types/day";
import { splitOnEmptyLines } from "../../utils/parsing";
import { funcSortDesc } from "../../utils/sort";
import { Monkey, parseMonkeyNote } from "./day11Parser";

const processRound = (monkeys: Monkey[]): void => {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];

    for (let itemI = 0; itemI < monkey.items.length; itemI++) {
      const item = monkey.items[itemI];

      // console.log(`Monkey ${i}: Inspecting ${item}`);

      const newWorryLevel = monkey.inspectItem(item);

      // console.log(
      //   `Monkey ${i}: Finished inspecting ${item} -> ${newWorryLevel}`
      // );

      const by3 = Math.floor(newWorryLevel / 3);

      // console.log(`Monkey ${i}: Got bored ${newWorryLevel} -> ${by3}`);

      const nextMonkey = monkey.getNextMonkey(by3);

      // console.log(`Monkey ${i}: Throwing ${by3} to ${nextMonkey}`);

      monkeys[nextMonkey].items.push(by3);

      monkey.inspected = monkey.inspected + 1;
    }

    monkey.items = [];
  }
};

const printMonkeyItems = (monkeys: Monkey[]): void => {
  const toPrint = monkeys
    .map((monkey, i) => `Monkey ${i}: ${monkey.items.join(", ")}`)
    .join("\n");
  // console.log(toPrint);
};

export default {
  solvePartOne: (input: string[]): string | number => {
    const monkeys = splitOnEmptyLines(input).map(parseMonkeyNote);

    for (let i = 0; i < 20; i++) {
      processRound(monkeys);
    }

    return funcSortDesc(monkeys.map((monkey) => monkey.inspected))
      .slice(0, 2)
      .reduce((prev, curr) => prev * curr, 1);

    // processRound(monkeys);
    // printMonkeyItems(monkeys);
    return "";
  },
  solvePartTwo: (input: string[]): string | number => {
    return "";
  },
} as Day;
