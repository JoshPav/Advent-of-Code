import { Day, PuzzleInput } from '../../types/day';
import { Point } from '../../types/geometry';
import { getAllAdjancent, getEast, getNorth, getNorthEast, getNortWest, getSouth, getSouthEast, getSouthWest, getWest } from '../../utils/geometryUtils';
import { isWithinRange } from '../../utils/range';

const parseInput = (input: PuzzleInput): string[][] => input.map(line => line.split(""))

const checkNeighboursForGrid = (grid: string[][]) => (p: Point, char: string) => {
  return getAllAdjancent(p).filter(point => grid[point.y][point.x] === char)
}

const directionalMoves = [
  getNorth,
  getNorthEast,
  getEast,
  getSouthEast,
  getSouth,
  getSouthWest,
  getWest,
  getNortWest,
]

const check = (grid: string[][]) => {
  
  const isWithinGrid = (p: Point) => isWithinRange({ start: 0, end: grid.length - 1 })(p.y) && isWithinRange({ start: 0, end: grid[0].length - 1 })(p.x)

  return ({ x, y }: Point, getNextPoint: (p: Point) => Point, chars: string[]) => {

  if (grid[y][x] === chars[0]) {
    if (chars.length === 1) {
      return true;
    }    
    
    const nextPoint = getNextPoint({ x, y });

    if (!isWithinGrid(nextPoint)) {
      return false;
    }

    return check(grid)(nextPoint, getNextPoint, chars.slice(1))
  } 
  
  return false;
}
}

export default {
  solvePartOne: (input) => {

    const grid = parseInput(input);

    let count = 0

    const checkOnGrid = check(grid)

    const word = 'XMAS';

    const split = word.split("");

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {

        directionalMoves.forEach(move => {
          if (checkOnGrid({ x, y }, move, split)) {
            count += 1;
          }
        })

      }
      
    }


    return count;
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
