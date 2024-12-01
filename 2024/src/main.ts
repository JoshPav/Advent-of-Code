import { readFileForDay } from './utils/io';

solveForDay();

async function solveForDay(
  dayNumber: number = new Date().getDate(),
): Promise<void> {
  const paddedDayNumber = String(dayNumber).padStart(2, '0');

  const input = readFileForDay(paddedDayNumber);

  console.log('🎄 Advent of Code 2024 🎁');
  console.log(`Day ${paddedDayNumber}`);

  // Dynamically import the day from the file. This assumes the file and folder are named correctly. And the file exports a default Day
  const { default: day } = await import(
    `./solutions/day${paddedDayNumber}/day${paddedDayNumber}`
  );

  const partOneAnswer = day.solvePartOne(input);
  console.log(`Part 1: ${partOneAnswer}`);

  const partTwoAnswer = day.solvePartTwo(input);
  console.log(`Part 2: ${partTwoAnswer}`);
}
