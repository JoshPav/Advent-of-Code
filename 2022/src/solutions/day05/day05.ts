import { Day } from "../../types/day";

type Instruction = {
  from: number;
  to: number;
  amount: number;
};

const parseInput = (
  input: string[]
): { crates: string[][]; instructions: Instruction[] } => {
  const split = input.indexOf("");
  const crates = parseCrateInput(input.slice(0, split));

  const instructions = input.slice(split + 1).map(parseInstruction);
  return { crates, instructions };
};

const parseInstruction = (instruction: string): Instruction => {
  const [amount, from, to] = instruction.match(/([0-9]+)/g);
  return { amount: parseInt(amount), from: parseInt(from), to: parseInt(to) };
};

const buildEmptyCrates = (crateCount: number): string[][] => {
  const emptyCrates = [];

  for (let i = 0; i < crateCount; i++) {
    emptyCrates.push([]);
  }

  return emptyCrates;
};

const parseCrateInput = (crateInput: string[]): string[][] => {
  const crateCount = crateInput[crateInput.length - 1]
    .trim()
    .split(/\s+/g).length;

  const crates = buildEmptyCrates(crateCount);

  [...crateInput.slice(0, crateInput.length - 1)]
    .reverse()
    .forEach((crateLevel) => {
      for (let i = 0; i < crateLevel.length; i += 4) {
        const crateName = crateLevel
          .slice(i, Math.min(i + 4, crateLevel.length))
          .trim();

        if (crateName !== "") {
          crates[Math.floor(i / 4)].push(crateName);
        }
      }
    });
  return crates;
};

const applyCm9000Instruction = (
  { from, to, amount }: Instruction,
  crates: string[][]
): void => {
  for (let i = 0; i < amount; i++) {
    crates[to - 1].push(crates[from - 1].pop());
  }
};

const applyCm9001Instruction = (
  { from, to, amount }: Instruction,
  crates: string[][]
): void => {
  const fromSize = crates[from - 1].length;
  const toMove = crates[from - 1].splice(fromSize - amount);
  crates[to - 1].push(...toMove);
};

export default {
  solvePartOne: (input: string[]): string | number => {
    const { crates, instructions } = parseInput(input);

    instructions.forEach((instruction) => {
      applyCm9000Instruction(instruction, crates);
    });

    return crates
      .map((crate) => crate[crate.length - 1])
      .map((crateName) => crateName.match(/([A-Z])/)[0])
      .reduce((prev, curr) => prev + curr, "");
  },
  solvePartTwo: (input: string[]): string | number => {
    const { crates, instructions } = parseInput(input);

    instructions.forEach((instruction) => {
      applyCm9001Instruction(instruction, crates);
    });

    return crates
      .map((crate) => crate[crate.length - 1])
      .map((crateName) => crateName.match(/([A-Z])/)[0])
      .reduce((prev, curr) => prev + curr, "");
  },
} as Day;
