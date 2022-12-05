import { Day } from "../../types/day";
import { buildArray, getLast } from "../../utils/collections";
import { splitOnEmptyLines } from "../../utils/parsing";
import { concat } from "../../utils/reducers";

type Instruction = {
  from: number;
  to: number;
  amount: number;
};

type CrateMoverInstructionProcessor = (
  instruction: Instruction,
  crates: string[][]
) => void;

const parseInput = (
  input: string[]
): { crates: string[][]; instructions: Instruction[] } => {
  const [crateInput, instructionInput] = splitOnEmptyLines(input);

  return {
    crates: parseCrateInput(crateInput),
    instructions: instructionInput.map(parseInstruction),
  };
};

const parseInstruction = (instruction: string): Instruction => {
  const [amount, from, to] = instruction.match(/([0-9]+)/g);
  return {
    amount: parseInt(amount),
    from: parseInt(from) - 1,
    to: parseInt(to) - 1,
  };
};

const parseCrateInput = (crateInput: string[]): string[][] => {
  const crateCount = crateInput[crateInput.length - 1]
    .trim()
    .split(/\s+/g).length;

  const crates = buildArray<string[]>(crateCount, () => []);

  [...crateInput.slice(0, crateInput.length - 1)]
    .reverse()
    .forEach((crateLevel) => {
      for (let i = 0; i < crateLevel.length; i += 4) {
        const crateName = crateLevel
          .slice(i, Math.min(i + 4, crateLevel.length))
          .trim();

        if (crateName !== "") {
          crates[Math.floor(i / 4)].push(crateName.match(/([A-Z])/)[0]);
        }
      }
    });
  return crates;
};

const applyCrateMoverInstruction = (
  { from, to, amount }: Instruction,
  crates: string[][],
  allowMany: boolean
) => {
  const toMove = crates[from].splice(crates[from].length - amount);
  if (!allowMany) {
    // Moving one at a time is equivalent to moving multiple & flipping the order
    toMove.reverse();
  }
  crates[to].push(...toMove);
};

const applyCm9000Instruction = (
  instruction: Instruction,
  crates: string[][]
): void => applyCrateMoverInstruction(instruction, crates, false);

const applyCm9001Instruction = (
  instruction: Instruction,
  crates: string[][]
): void => applyCrateMoverInstruction(instruction, crates, true);

const getCrateOrder = (crates: string[][]): string => {
  return crates.map(getLast).reduce(concat, "");
};

const rearrangeCrates = (
  input: string[],
  processor: CrateMoverInstructionProcessor
): string => {
  const { crates, instructions } = parseInput(input);

  instructions.forEach((instruction) => {
    processor(instruction, crates);
  });

  return getCrateOrder(crates);
};

export default {
  solvePartOne: (input: string[]): string =>
    rearrangeCrates(input, applyCm9000Instruction),
  solvePartTwo: (input: string[]): string =>
    rearrangeCrates(input, applyCm9001Instruction),
} as Day;
