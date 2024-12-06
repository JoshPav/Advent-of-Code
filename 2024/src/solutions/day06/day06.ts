import { Day, PuzzleInput } from "../../types/day";
import { Point } from "../../types/geometry";
import { getEast, getNorth, getSouth, getWest } from "../../utils/geometryUtils";


const parseInput = (input: PuzzleInput): string[][] => input.map(line => line.split(""))

const findGuard = (map: string[][]): Point => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      
      if (map[y][x] === '^') {
        return { x, y }
      }
    }
    
  }

  throw new Error();
}

const isOutOfBounds = (map: string[][]) => (pos: Point) => pos.x < 0 || pos.y < 0 || pos.x >= map[0].length || pos.y >= map.length

const dirs = [getNorth, getEast, getSouth, getWest]

export default {
  solvePartOne: (input) => {

    const map = parseInput(input)

    let guardPos = findGuard(map)

    let currDir = 0


    const isInMap = (pos: Point) => !isOutOfBounds(map)(pos)

    const uniquePositions = new Set();

    while (isInMap(dirs[currDir](guardPos))) {
      const nextPos = dirs[currDir](guardPos)
      
      if (map[nextPos.y][nextPos.x] === '#') {
        currDir = (currDir + 1) % 4
      } else {
        guardPos = nextPos;
        uniquePositions.add(`${guardPos.x} - ${guardPos.y}`)
      }
    }

    return uniquePositions.size
  },
  solvePartTwo: (input) => {
    return ""
  },
} as Day;
