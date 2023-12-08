import { Day } from '../../types/day';
import { splitOnEmptyLines } from '../../utils/parsing';
import { product } from '../../utils/reducers';

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

  const [left, right] = nextNodes.match(/[A-Z0-9]{3}/g);

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

const isGhostEnd = (node: string) => node.endsWith('Z');

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
    const { instructions, nodes } = parseMap(input);

    // let instructionIndex = 0;

    // let timesMoved = 0;

    let allGhostNodes = Object.keys(nodes).filter((node) => node.endsWith('A'));

    const whenOnZ = allGhostNodes.map((node) => {
      let currentNode = node;
      let timesMoved = 0;
      let instructionIndex = 0;

      while (!isGhostEnd(currentNode)) {
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
    });

    console.log({ whenOnZ });

    // while (!allGhostNodes.every(isGhostEnd)) {
    //   const nextInstruction = instructions[instructionIndex];

    //   // Update nodes
    //   allGhostNodes = allGhostNodes.map((node) => nodes[node][nextInstruction]);

    //   timesMoved++;

    //   // Update instruction
    //   instructionIndex++;
    //   if (instructionIndex === instructions.length) {
    //     instructionIndex = 0;
    //   }
    // }

    return whenOnZ.reduce(product, 1);
  },
} as Day;
