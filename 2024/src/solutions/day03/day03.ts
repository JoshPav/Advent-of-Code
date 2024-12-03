import { Day } from "../../types/day";
import { sum } from "../../utils/reducers";

type Instruction = {
  x: number;
  y: number;
  type: 'mul';
}

const mulInstrucionRegex = new RegExp(/mul\(([0-9]+),([0-9]+)\)/g);

const parseMatch = ([_, x, y]: string[]): Instruction => ({
  type: 'mul', x: parseInt(x), y: parseInt(y)
})

const readInstructions = (input: string): Instruction[] => {
  let match = mulInstrucionRegex.exec(input);
  
  const instructions: Instruction[] = [];

  
  while (match) {
    instructions.push(parseMatch(match))

    match = mulInstrucionRegex.exec(input);
  }

  return instructions;
}

const processInstruction = ({ x, y }: Instruction) => x * y;

export default {
  solvePartOne: (input) => {
    
    return input.flatMap(readInstructions).map(processInstruction).reduce(sum)
    
  },
  solvePartTwo: (input) => {
    return ""
  },
} as Day;
