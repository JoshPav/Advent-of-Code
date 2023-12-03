import { Day } from '../../types/day';
import { Point } from '../../types/geometry';
import { areAdjacent } from '../../utils/geometryUtils';
import { sum, sumNested } from '../../utils/reducers';

type PartNumber = {
  number: number;
  position: Point;
};

type Symbol = {
  symbol: string;
  position: Point;
};

const hasGearSymbol = ({ symbol }: Symbol) => symbol === '*';

const digitRegex = /[0-9]/;

const isDigit = (element: string | undefined) => digitRegex.test(element);

const parseEngineSchematic = (
  lines: string[],
): { parts: PartNumber[]; symbols: Symbol[] } => {
  const parts: PartNumber[] = [];
  const symbols: Symbol[] = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    let digits = '';

    for (let x = 0; x < line.length; x++) {
      const element = line[x];

      if (digitRegex.test(element)) {
        digits += element;

        if (!isDigit(line[x + 1])) {
          parts.push({
            number: Number.parseInt(digits),
            position: {
              x: x - (digits.length - 1),
              y,
            },
          });

          digits = '';
        }

        continue;
      }

      if (element !== '.') {
        symbols.push({
          position: {
            x,
            y,
          },
          symbol: element,
        });
      }
    }
  }

  return {
    parts,
    symbols,
  };
};

const getAllCoords = ({ number, position }: PartNumber): Point[] => {
  const digitLength = number.toString().length;

  const points = [];

  for (let i = 0; i < digitLength; i++) {
    points.push({
      x: position.x + i,
      y: position.y,
    });
  }

  return points;
};

const isTouchingSymbol = (symbol: Symbol) => (part: PartNumber) =>
  getAllCoords(part).some((coord) => areAdjacent(coord, symbol.position));

const isGear = (touchingParts: PartNumber[]) => touchingParts.length === 2;

const getGearRatio = (touchingParts: PartNumber[]) => {
  if (!isGear(touchingParts)) {
    return 0;
  }

  return touchingParts[0].number * touchingParts[1].number;
};

const getAdjacentParts = (allParts: PartNumber[]) => (symbol: Symbol) =>
  allParts.filter(isTouchingSymbol(symbol));

const isTouchingAnySymbol = (allSymbols: Symbol[]) => (part: PartNumber) =>
  allSymbols.some((symbol) => isTouchingSymbol(symbol)(part));

export default {
  solvePartOne: (input) => {
    const { symbols, parts } = parseEngineSchematic(input);

    return parts
      .filter(isTouchingAnySymbol(symbols))
      .reduce(sumNested('number'), 0);
  },
  solvePartTwo: (input) => {
    const { symbols, parts } = parseEngineSchematic(input);

    return symbols
      .filter(hasGearSymbol)
      .map(getAdjacentParts(parts))
      .map(getGearRatio)
      .reduce(sum, 0);
  },
} as Day;
