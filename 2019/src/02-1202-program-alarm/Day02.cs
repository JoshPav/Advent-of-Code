using System;
using System.Collections.Generic;
using System.Text;

namespace advent_of_code
{
    class Day02 : Day
    {

        public Day02(string inputPath, string dayTitle) : base(inputPath, dayTitle) { }

        public override void CalculateAnswers()
        {
            int[] intCodes = loadMemory();

            partOneAnswer = CalculateOutput(intCodes, 12, 2).ToString();

            partTwoAnswer = CalcInputsFromOutput(intCodes, 19690720).ToString();
        }

        private int[] loadMemory()
        {
            return Array.ConvertAll(fileLines[0].Split(','), s => int.Parse(s));
        }

        private int CalcInputsFromOutput(int[] intCodes, int desiredOutput)
        {
            int output;

            int noun,
                verb;

            for(noun = 0; noun <= 99; noun++)
            {
                for (verb = 0; verb <= 99; verb++)
                {
                    int[] memory = loadMemory();
                    output = CalculateOutput(memory, noun, verb);
                    
                    if(output == desiredOutput)
                    {
                        return noun * 100 + verb;
                    } 
                }
            }

            return -1;
        }

        private int CalculateOutput(int[] memory, int noun, int verb)
        {
            int address = 0;
            int opcode = memory[address];

            memory[1] = noun;
            memory[2] = verb;

            while (opcode != 99)
            {
                switch(opcode)
                {
                    case 1:
                        memory = ProcessOpcode(address, memory, 
                            (int a, int b) => 
                            a + b);
                        break;
                    case 2:
                        memory = ProcessOpcode(address, memory,
                            (int a, int b) =>
                            a * b);
                        break;
                    default:
                        return -1;
                }
                address += 4;
                opcode = memory[address];
            }

            return memory[0];
        }

        private int[] ProcessOpcode(int opcodeIndex, int[] memory,Func<int,int,int> operation)
        {
            int numOne = memory[memory[opcodeIndex + 1]];
            int numTwo = memory[memory[opcodeIndex + 2]];
            memory[memory[opcodeIndex + 3]] = operation(numOne, numTwo);
            return memory;
        }

    }
}
