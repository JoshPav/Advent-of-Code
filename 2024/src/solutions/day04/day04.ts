import { Day, PuzzleInput } from '../../types/day';
import { Point } from '../../types/geometry';
import { getEast, getNorth, getNorthEast, getNortWest as getNorthWest, getSouth, getSouthEast, getSouthWest, getWest } from '../../utils/geometryUtils';

const parseInput = (input: PuzzleInput): string[][] => input.map(line => line.split(""))

const directionalMoves = [
  getNorth,
  getNorthEast,
  getEast,
  getSouthEast,
  getSouth,
  getSouthWest,
  getWest,
  getNorthWest,
]

const check = (grid: string[][]) => ({ x, y }: Point, getNextPoint: (p: Point) => Point, [toMatch, ...rest]: string[]) => 
  grid?.[y]?.[x] === toMatch && (!rest.length || check(grid)(getNextPoint({ x, y }), getNextPoint, rest))


const isXmas = (grid: string[][]) => (middle: Point) => {
  return (
    check(grid)(getNorthWest(middle), getSouthEast, ['M', 'A', 'S']) 
      || check(grid)(getNorthWest(middle), getSouthEast, ['S','A','M'])) 
    && (check(grid)(getNorthEast(middle), getSouthWest, ['M', 'A', 'S']) 
      || check(grid)(getNorthEast(middle), getSouthWest, ['S','A','M']))
}

export default {
  solvePartOne: (input) => {

    const grid = parseInput(input);

    let count = 0

    const checkOnGrid = check(grid)

    const letters = 'XMAS'.split("");

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {

        directionalMoves.forEach(move => {
          if (checkOnGrid({ x, y }, move, letters)) {
            count += 1;
          }
        })

      }
      
    }

    return count;
  },
  solvePartTwo: (input) => {
    const grid = parseInput(input);

    let count = 0

    for (let y = 1; y < grid.length - 1 ; y++) {
      for (let x = 1; x < grid[y].length - 1; x++) {

        if (grid[y][x] === 'A' && isXmas(grid)({ x, y })) {
          count += 1;
        } 

      }
      
    }

    return count;
  },
} as Day;
