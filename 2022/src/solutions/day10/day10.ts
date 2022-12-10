import { Day } from "../../types/day";
import { chunk } from "../../utils/collections";
import { sum } from "../../utils/reducers";

const getSignalStrength = (cycle: number, xRegister: number): number =>
  cycle * xRegister;

const getSignalStrengthForCycles = (cycles: number[], xValues: number[]) => {
  return cycles
    .map((cycleNo) => getSignalStrength(cycleNo, xValues[cycleNo - 1]))
    .reduce(sum, 0);
};

const processCycles = (input: string[]): number[] => {
  let x = 1;

  const xValues = [];

  input.forEach((line) => {
    // Save X at current cycle
    xValues.push(x);

    const [operation, xVal] = line.split(" ");

    if (operation === "addx") {
      // One cycle while still processing
      xValues.push(x);
      x += parseInt(xVal);
    }
  });

  return xValues;
};

const isSpriteTouching = (spritePosition: number, pixel: number): boolean => {
  return spritePosition - 1 <= pixel && pixel <= spritePosition + 1;
};

export default {
  solvePartOne: (input: string[]): string | number =>
    getSignalStrengthForCycles(
      [20, 60, 100, 140, 180, 220],
      processCycles(input)
    ),
  solvePartTwo: (input: string[]): string | number => {
    const cycleValues = processCycles(input);

    const crtRows = chunk(cycleValues, 40);

    const output = crtRows
      .map((row) =>
        row
          .map((spritePosition, currPixel) =>
            isSpriteTouching(spritePosition, currPixel) ? "█" : " "
          )
          .join("")
      )
      .join("\n");

    console.log(output);

    return output;
  },
} as Day;
