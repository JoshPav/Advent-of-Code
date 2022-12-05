import { Day } from "../../types/day";
import { buildArray, getLast } from "../../utils/collections";
import { chunkStr, splitOnEmptyLines } from "../../utils/parsing";
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
): { stacks: string[][]; instructions: Instruction[] } => {
  const [crateInput, instructionInput] = splitOnEmptyLines(input);

  return {
    stacks: parseCrateInput(crateInput),
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

const getCrateLevels = (crateInput: string[]): string[] =>
  [...crateInput.slice(0, crateInput.length - 1)].reverse();

const getCratesOnLevel = (
  crateLevel: string
): { crateName: string; stack: number }[] =>
  chunkStr(crateLevel, 4)
    .map((crate, index) => ({
      crateName: crate.trim(),
      stack: index,
    }))
    .filter(({ crateName: crate }) => crate !== "");

const parseCrateInput = (crateInput: string[]): string[][] => {
  const crateCount = crateInput[crateInput.length - 1]
    .trim()
    .split(/\s+/g).length;

  const stacks = buildArray<string[]>(crateCount, () => []);

  getCrateLevels(crateInput).forEach((crateLevel) => {
    getCratesOnLevel(crateLevel).forEach((crate) =>
      stacks[crate.stack].push(crate.crateName.match(/([A-Z])/)[0])
    );
  });
  return stacks;
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
  const { stacks, instructions } = parseInput(input);

  instructions.forEach((instruction) => {
    processor(instruction, stacks);
  });

  return getCrateOrder(stacks);
};

export default {
  solvePartOne: (input: string[]): string =>
    rearrangeCrates(input, applyCm9000Instruction),
  solvePartTwo: (input: string[]): string =>
    rearrangeCrates(input, applyCm9001Instruction),
} as Day;
