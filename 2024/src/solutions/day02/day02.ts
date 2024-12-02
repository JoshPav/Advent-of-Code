import { Day, PuzzleInput } from '../../types/day';
import { getAllCombinations } from '../../utils/collections';
import { allNegative, allPositive, getDifferences } from '../../utils/math';
import { not } from '../../utils/predicate';
import { isWithinRange } from '../../utils/range';

type Report = {
  levels: number[];
};

const parseInput = (input: PuzzleInput): Report[] =>
  input.map((line) => ({
    levels: line.split(/\s+/).map(Number),
  }));

const isInSafeRange = isWithinRange({ start: 1, end: 3 });

const isSafe = ({ levels }: Report) => {
  const diffs = getDifferences(levels);

  const diffSafe = diffs.every((diff) => isInSafeRange(Math.abs(diff)));

  return diffSafe && (allPositive(diffs) || allNegative(diffs));
};

const getDampendReports = (report: Report): Report[] =>
  getAllCombinations(report.levels).map((levels) => ({ levels }));

const hasValidDampendReport = (dampendReports: Report[]) =>
  dampendReports.some(isSafe);

export default {
  solvePartOne: (input) => parseInput(input).filter(isSafe).length,
  solvePartTwo: (input) => {
    const reports = parseInput(input);

    const unsafeDampend = reports
      .filter(not(isSafe))
      .map(getDampendReports)
      .filter(not(hasValidDampendReport)).length;

    return reports.length - unsafeDampend;
  },
} as Day;
