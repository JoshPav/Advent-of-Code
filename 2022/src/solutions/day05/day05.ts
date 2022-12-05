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
      // console.log(crateLevel);
      // console.log(crateLevel.length);

      for (let i = 0; i < crateLevel.length; i += 4) {
        // console.log(i);

        const crateName = crateLevel
          .slice(i, Math.min(i + 4, crateLevel.length))
          .trim();

        // console.log(`${crateName} + ${Math.floor(i / 4)}`);
        if (crateName !== "") {
          crates[Math.floor(i / 4)].push(crateName);
          console.log(`YES ${crateName} + ${Math.floor(i / 4)}`);
        } else {
          console.log(`NO  ${crateName} + ${Math.floor(i / 4)}`);
        }
      }

      // crateLevel.split(/\s+/).forEach((crate) => {
      //   console.log(`${crate} ${crateLevel.indexOf(crate) % 3}`);
      //   if (crate !== "") crates[crateLevel.indexOf(crate) % 3].push(crate);
      // });
    });
  // console.log(crates);
  return crates;
};

export default {
  solvePartOne: (input: string[]): string | number => {
    const { crates, instructions } = parseInput(input);

    console.log(crates);

    instructions.forEach(({ from, to, amount }) => {
      for (let i = 0; i < amount; i++) {
        crates[to - 1].push(crates[from - 1].pop());
      }
    });

    return crates
      .map((crate) => {
        console.log(crate);

        return crate[crate.length - 1];
      })
      .map((crateName) => {
        // console.log(crateName);

        return crateName.match(/([A-Z])/)[0];
      })
      .reduce((prev, curr) => prev + curr, "");
  },
  solvePartTwo: (input: string[]): string | number => {
    return "";
  },
} as Day;
