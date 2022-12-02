import { Day } from "../../types/day";
import { sum } from "../../utils/reducers";

const choices: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const parseStrategyGuide = (line: string): [number, number] => {
  const [opp, me] = line.split(" ");
  return [choices[opp], choices[me]];
};

const getPointsForOutcome = (oppMove: number, myMove: number): number => {
  if (oppMove === myMove) return 3;

  // Wrap around
  if (myMove == 3 && oppMove == 1) return 0;

  if (myMove > oppMove || (oppMove == 3 && myMove === 1)) return 6;

  return 0;
};

const getRoundScore = (oppMove: number, myMove: number): number =>
  getPointsForOutcome(oppMove, myMove) + myMove;

const getMyMove = (oppMove: number, outcome: number): number => {
  if (outcome === 3) {
    if (oppMove === 3) return 1;

    return oppMove + 1;
  }

  if (outcome === 2) {
    return oppMove;
  }

  if (oppMove === 1) return 3;

  return oppMove - 1;
};

export default {
  solvePartOne: (strategyGuide: string[]): string | number => {
    return strategyGuide
      .map(parseStrategyGuide)
      .map(([opp, me]) => getRoundScore(opp, me))
      .reduce(sum, 0);
  },
  solvePartTwo: (strategyGuide: string[]): string | number => {
    return strategyGuide
      .map(parseStrategyGuide)
      .map(([opp, outcome]) => getRoundScore(opp, getMyMove(opp, outcome)))
      .reduce(sum, 0);
  },
} as Day;
