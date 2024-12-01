export type PuzzleInput = string[];

export interface Day {
  solvePartOne: (input: PuzzleInput) => string | number;
  solvePartTwo: (input: PuzzleInput) => string | number;
}
