import { readFileForDay } from "./shared/fileToArray";

// The day to run
const dayNumber = 4

// Run the code
solveForDay(dayNumber)

async function solveForDay(dayNumber: number): Promise<void> {
  // Read the input
  const input = readFileForDay(dayNumber)

  console.log('🎄 Advent of Code 2021 🎁')
  console.log(`Day ${dayNumber}`)

  // Dynamically import the day from the file. This assumes the file and folder are named correctly. And the file exports a default Day
  const { default: day } = await import(`./day${dayNumber}/Day${dayNumber}`)

  const partOneAnswer = day.solvePartOne(input)
  console.log(`Part 1 Actual: ${partOneAnswer}`)

  const partTwoAnswer = day.solvePartTwo(input)
  console.log(`Part 2 Actual: ${partTwoAnswer}`)
}