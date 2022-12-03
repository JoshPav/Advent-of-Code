import { Day } from "../../types/day";
import { chunk, intersection } from "../../utils/collections";
import { sum } from "../../utils/reducers";

const getRucksackGroups = (rucksacks: string[]) => chunk(rucksacks, 3);

function getRucksackContents(rucksack: string): string[] {
  const itemsPerCompartment = rucksack.length / 2;
  return [
    rucksack.slice(0, itemsPerCompartment),
    rucksack.slice(itemsPerCompartment),
  ];
}

function getAllItems(rucksack: string): string[] {
  return rucksack.split("");
}

function getPriority(itemType: string): number {
  const charCode = itemType.charCodeAt(0);

  // 27 -> 52
  if (65 <= charCode && charCode <= 90) return charCode - 38;

  if (97 <= charCode && charCode <= 122) return charCode - 96;

  throw new Error();
}

export default {
  solvePartOne: (rucksacks: string[]): string | number => {
    return rucksacks
      .map(getRucksackContents)
      .map(([compartmentA, compartmentB]) =>
        intersection(getAllItems(compartmentA), getAllItems(compartmentB))
      )
      .flatMap((rucksack) => rucksack.map(getPriority))
      .reduce(sum, 0);
  },
  solvePartTwo: (rucksacks: string[]): string | number => {
    return getRucksackGroups(rucksacks)
      .map((group) => group.map(getAllItems))
      .map((group) => intersection(intersection(group[0], group[1]), group[2]))
      .flatMap((group) => getPriority(group[0]))
      .reduce(sum, 0);
  },
} as Day;
