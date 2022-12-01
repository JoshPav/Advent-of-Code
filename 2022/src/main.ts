import { readFileForDay } from "./shared/fileToArray";

const dayNumber = 1;

solveForDay(dayNumber);

async function solveForDay(dayNumber: number): Promise<void> {
  const input = readFileForDay(dayNumber);

  console.log("🎄 Advent of Code 2021 🎁");
  console.log(`Day ${dayNumber}`);

  // Dynamically import the day from the file. This assumes the file and folder are named correctly. And the file exports a default Day
  const { default: day } = await import(`./day${dayNumber}/day${dayNumber}`);

  const partOneAnswer = day.solvePartOne(input);
  console.log(`Part 1: ${partOneAnswer}`);

  const partTwoAnswer = day.solvePartTwo(input);
  console.log(`Part 2: ${partTwoAnswer}`);
}
