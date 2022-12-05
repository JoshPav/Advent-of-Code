import { PuzzleExample } from "../types/examples";

export const withSameInput = (
  examples: PuzzleExample[],
  newExpected: string[]
): PuzzleExample[] =>
  examples.map((example, index) => ({
    ...example,
    expected: newExpected[index],
  }));
