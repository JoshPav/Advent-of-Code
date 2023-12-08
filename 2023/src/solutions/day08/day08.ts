import { Day } from '../../types/day';
import { splitOnEmptyLines } from '../../utils/parsing';

enum Instruction {
  LEFT = 'left',
  RIGHT = 'right',
}

type Nodes = Record<Instruction, string>;

type Map = {
  instructions: Instruction[];
  nodes: Record<string, Nodes>;
};

const parseNode = (line: string): [string, Nodes] => {
  const [id, nextNodes] = line.split('=');

  const [left, right] = nextNodes.match(/[A-Z]{3}/g);

  return [id.trim(), { [Instruction.LEFT]: left, [Instruction.RIGHT]: right }];
};

const parseInstruction = (instruction: string) =>
  instruction === 'L' ? Instruction.LEFT : Instruction.RIGHT;

const parseMap = (map: string[]): Map => {
  const [[instructions], nodes] = splitOnEmptyLines(map);

  return {
    instructions: [...instructions].map(parseInstruction),
    nodes: Object.fromEntries(nodes.map(parseNode)),
  };
};

export default {
  solvePartOne: (input) => {
    const { instructions, nodes } = parseMap(input);

    let currentNode = 'AAA';

    let instructionIndex = 0;

    let timesMoved = 0;

    while (currentNode !== 'ZZZ') {
      const nextInstruction = instructions[instructionIndex];

      // Update node
      const nextNode = nodes[currentNode];

      currentNode = nextNode[nextInstruction];
      timesMoved++;

      // Update instruction
      instructionIndex++;
      if (instructionIndex === instructions.length) {
        instructionIndex = 0;
      }
    }

    return timesMoved;
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
