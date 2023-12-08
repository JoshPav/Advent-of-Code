import { Day } from '../../types/day';
import { leastCommonMultiple } from '../../utils/math';
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

const GetNextNode =
  (nodes: Record<string, Nodes>) =>
  (currentNode: string, instruction: Instruction) =>
    nodes[currentNode][instruction];

const GetNextInstruction = (instructions: Instruction[]) => (index: number) => {
  return instructions[index % instructions.length];
};

const ProcessMap =
  ({ instructions, nodes }: Map, isEnd: NodePredicate) =>
  (start: string): number => {
    let currentNode = start;

    let instructionIndex = 0;
    let timesMoved = 0;

    const getNextNode = GetNextNode(nodes);
    const getNextInstruction = GetNextInstruction(instructions);

    while (!isEnd(currentNode)) {
      currentNode = getNextNode(
        currentNode,
        getNextInstruction(instructionIndex++),
      );
      timesMoved++;
    }

    return timesMoved;
  };

type NodePredicate = (node: string) => boolean;

export default {
  solvePartOne: (input) => {
    const isEnd: NodePredicate = (node) => node === 'ZZZ';

    return ProcessMap(parseMap(input), isEnd)('AAA');
  },
  solvePartTwo: (input) => {
    const isGhostStart: NodePredicate = (node) => node.endsWith('A');
    const isGhostEnd = (node: string) => node.endsWith('Z');

    const map = parseMap(input);
    const processMap = ProcessMap(map, isGhostEnd);

    return Object.keys(map.nodes)
      .filter(isGhostStart)
      .map(processMap)
      .reduce(leastCommonMultiple);
  },
} as Day;
