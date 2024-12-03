import { Day } from '../../types/day';
import { sum } from '../../utils/reducers';
import { parseRegexp } from '../../utils/regex';

type MultiplyInstruction = {
  x: number;
  y: number;
  type: 'mul';
};

type DoInstruction = {
  type: 'do';
};

type DontInstruction = {
  type: 'dont';
};

type Instruction = MultiplyInstruction | DoInstruction | DontInstruction;

const instrucionRegex = new RegExp(
  /(?:mul\(([0-9]+),([0-9]+)\))|(?:do\(\))|(?:don\'t\(\))/g,
);

const isMultiply = (
  instruction: Instruction,
): instruction is MultiplyInstruction => instruction.type === 'mul';

const parseMatch = ([str, x, y]: string[]): Instruction => {
  if (str.startsWith('mul')) {
    return {
      type: 'mul',
      x: parseInt(x),
      y: parseInt(y),
    };
  }

  return str.startsWith(`don't`) ? { type: 'dont' } : { type: 'do' };
};

const readInstructions = parseRegexp(instrucionRegex, parseMatch);

const processMultiply = ({ x, y }: MultiplyInstruction) => x * y;

export default {
  solvePartOne: (input) =>
    input
      .flatMap(readInstructions)
      .filter(isMultiply)
      .map(processMultiply)
      .reduce(sum),
  solvePartTwo: (input) => {
    const instructions = input.flatMap(readInstructions);

    let processInstruction = true;
    let count = 0;

    for (const instruction of instructions) {
      if (instruction.type === 'mul' && processInstruction) {
        count += processMultiply(instruction);
      } else {
        processInstruction = instruction.type === 'do';
      }
    }

    return count;
  },
} as Day;
