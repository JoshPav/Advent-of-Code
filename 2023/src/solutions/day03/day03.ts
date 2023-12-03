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

const digitRegex = /[0-9]/;

const parseEngineSchematic = (
  lines: string[],
): { parts: PartNumber[]; symbols: Symbol[] } => {
  const parts: PartNumber[] = [];
  const symbols: Symbol[] = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    let currentDigits = '';

    for (let x = 0; x < line.length; x++) {
      const element = line[x];

      if (digitRegex.test(element)) {
        currentDigits += element;
        continue;
      }

      if (currentDigits.length) {
        parts.push({
          number: Number(currentDigits),
          position: {
            x: x - currentDigits.length,
            y,
          },
        });

        currentDigits = '';
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

    if (currentDigits.length) {
      parts.push({
        number: Number(currentDigits),
        position: {
          x: line.length - currentDigits.length,
          y,
        },
      });

      currentDigits = '';
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

const isTouchingSymbol = (part: PartNumber, symbol: Symbol) =>
  getAllCoords(part).some((coord) => areAdjacent(coord, symbol.position));

export default {
  solvePartOne: (input) => {
    const { symbols, parts } = parseEngineSchematic(input);

    const engineParts = parts.filter((part) =>
      symbols.some((symbol) => isTouchingSymbol(part, symbol)),
    );

    return engineParts.reduce(sumNested('number'), 0);
  },
  solvePartTwo: (input) => {
    const { symbols, parts } = parseEngineSchematic(input);

    const idk = symbols
      .filter((symbol) => symbol.symbol === '*')
      .map((symbol) => {
        const touchingParts = parts.filter((part) =>
          isTouchingSymbol(part, symbol),
        );

        if (touchingParts.length == 2) {
          return touchingParts[0].number * touchingParts[1].number;
        }

        return 0;
      })
      .reduce(sum, 0);

    return idk;
  },
} as Day;
