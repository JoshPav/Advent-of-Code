import { Day } from '../../types/day';
import { parseNumbers } from '../../utils/parsing';
import { sum } from '../../utils/reducers';

const numberOfDigits = (num: number) => `${num}`.length;

const splitInHalf = (str: string) => {
  const half = str.length / 2;
  return [str.slice(0, half), str.slice(half)];
};

const add = (map: Map<number, number>) => (num: number, count: number) => map.set(num, (map.get(num) || 0) + count)

const createBlinkMap = () => {
  const newMap = new Map<number, number>()   
  const addStones = add(newMap);

  return {
    map: newMap,
    addStones
  }
}

const parseStones = (stones: string): Map<number, number> => {
  const map = new Map<number, number>()
  parseNumbers(stones).forEach(stone => {
    map.set(stone, (map.get(stone) || 0) + 1)
  })
  return map
}

const processBlinks = (stones: Map<number, number>, timesToBlink: number) => {

  for (let i = 0; i < timesToBlink; i++) {
    
    const { map, addStones } = createBlinkMap()
    
    for (const [stone, count] of stones) {
      if (stone === 0) {
        addStones(1, count)
        continue;
      }

      if (numberOfDigits(stone) % 2 === 0) {
        const [l, r] = splitInHalf(`${stone}`);

        addStones(parseInt(l), count)
        addStones(parseInt(r), count)

        continue;
      }

      addStones(stone * 2024, count)
    }

    stones = map;
  }

  return Array.from(stones.values()).reduce(sum, 0)
};


export default {
  solvePartOne: ([input]) => processBlinks(parseStones(input), 25),
  solvePartTwo: ([input]) => processBlinks(parseStones(input), 75),
} as Day;
