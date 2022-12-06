import { Day } from "../../types/day";

export default {
  solvePartOne: (input: string[]): string | number => {
    const signal = input[0];

    let lastFourCharacters: string[] = [];

    let charactersDifferent = 0;

    for (let i = 0; i < signal.length; i++) {
      const character = signal[i];

      if (lastFourCharacters.length > 3) {
        if (
          lastFourCharacters.every(
            (char) => lastFourCharacters.filter((c) => c === char).length === 1
          )
        ) {
          return i;
        }
      }

      lastFourCharacters.push(character);

      // console.log("adding");
      if (lastFourCharacters.length > 4) {
        lastFourCharacters = lastFourCharacters.slice(1);
      }

      console.log(lastFourCharacters);
    }

    return undefined;
  },
  solvePartTwo: (input: string[]): string | number => {
    const signal = input[0];

    let lastFourCharacters: string[] = [];

    let charactersDifferent = 0;

    for (let i = 0; i < signal.length; i++) {
      const character = signal[i];

      if (lastFourCharacters.length > 13) {
        if (
          lastFourCharacters.every(
            (char) => lastFourCharacters.filter((c) => c === char).length === 1
          )
        ) {
          return i;
        }
      }

      lastFourCharacters.push(character);

      // console.log("adding");
      if (lastFourCharacters.length > 14) {
        lastFourCharacters = lastFourCharacters.slice(1);
      }

      console.log(lastFourCharacters);
    }

    return undefined;
  },
} as Day;
