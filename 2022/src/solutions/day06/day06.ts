import { Day } from "../../types/day";
import { addWithCap, isDistinct } from "../../utils/collections";

const findMessageMarker = (
  message: string,
  distinctCharacters: number
): number => {
  let lastX: string[] = [];

  for (let i = 0; i < message.length; i++) {
    const character = message[i];

    if (lastX.length > distinctCharacters - 1 && isDistinct(lastX)) {
      return i;
    }

    lastX = addWithCap(lastX, character, distinctCharacters);
  }

  throw new Error("Could not find message marker");
};

export default {
  solvePartOne: ([signal]) => findMessageMarker(signal, 4),
  solvePartTwo: ([signal]) => findMessageMarker(signal, 14),
} as Day;
