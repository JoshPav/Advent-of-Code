import { Day } from '../../types/day';
import { parseNumbers } from '../../utils/parsing';

const numberOfDigits = (num: number) => `${num}`.length;

const splitInHalf = (str: string) => {
  const half = str.length / 2;
  return [str.slice(0, half), str.slice(half)];
};

const processStone = (stone: number): number[] => {
  // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
  if (stone === 0) {
    return [1];
  }

  /* 
    If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. 
    The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. 
  */
  if (numberOfDigits(stone) % 2 === 0) {
    const [l, r] = splitInHalf(`${stone}`);
    return [parseInt(l), parseInt(r)];
  }

  // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
  return [stone * 2024];
};

const processBlinks = (stones: number[], timesToBlink: number) => {
  for (let i = 0; i < timesToBlink; i++) {
    const newStones = [];   

    for (const stone of stones) {
      newStones.push(...processStone(stone));
    }

    stones = newStones;
  }

  return stones.length;
};

export default {
  solvePartOne: ([input]) => processBlinks(parseNumbers(input), 25),
  solvePartTwo: ([input]) => processBlinks(parseNumbers(input), 75),
} as Day;
