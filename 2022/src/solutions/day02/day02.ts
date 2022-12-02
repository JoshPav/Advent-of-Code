import { Day } from "../../types/day";
import { flip } from "../../utils/collections";
import { sum } from "../../utils/reducers";

enum RpsMove {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

enum RpsOutcome {
  Win = 6,
  Draw = 3,
  Loss = 0,
}

const losingMappings: Record<RpsMove, RpsMove> = {
  [RpsMove.Rock]: RpsMove.Scissors,
  [RpsMove.Paper]: RpsMove.Rock,
  [RpsMove.Scissors]: RpsMove.Paper,
};

const winningMappings: Record<RpsMove, RpsMove> = {
  [RpsMove.Scissors]: RpsMove.Rock,
  [RpsMove.Rock]: RpsMove.Paper,
  [RpsMove.Paper]: RpsMove.Scissors,
};

const encryptionMappings: Record<string, RpsMove> = {
  A: RpsMove.Rock,
  B: RpsMove.Paper,
  C: RpsMove.Scissors,
  X: RpsMove.Rock,
  Y: RpsMove.Paper,
  Z: RpsMove.Scissors,
};

const encryptedOutcomeMappings: Record<string, RpsOutcome> = {
  X: RpsOutcome.Loss,
  Y: RpsOutcome.Draw,
  Z: RpsOutcome.Win,
};

const parseDesiredMoveStrategyGuide = (round: string): [RpsMove, RpsMove] => {
  const [opp, me] = round.split(" ");
  return [encryptionMappings[opp], encryptionMappings[me]];
};

const parseDesiredOutcomeStrategyGuide = (
  round: string
): [RpsMove, RpsOutcome] => {
  const [opp, me] = round.split(" ");
  return [encryptionMappings[opp], encryptedOutcomeMappings[me]];
};

const getPointsForOutcome = (oppMove: RpsMove, myMove: RpsMove): number => {
  console.log(`${oppMove} vs ${myMove}`);

  if (oppMove === myMove) return RpsOutcome.Draw;

  return winningMappings[myMove] === oppMove ? RpsOutcome.Loss : RpsOutcome.Win;
};

const getRoundScore = (oppMove: RpsMove, myMove: RpsMove): number => {
  const x = getPointsForOutcome(oppMove, myMove) + myMove;
  console.log(x);
  return x;
};

const getMyMove = (oppMove: RpsMove, outcome: RpsOutcome): RpsMove => {
  console.log("opo " + oppMove);
  switch (outcome) {
    case RpsOutcome.Win:
      return winningMappings[oppMove];
    case RpsOutcome.Draw:
      return oppMove;
    case RpsOutcome.Loss:
      return losingMappings[oppMove];
  }
};

export default {
  solvePartOne: (strategyGuide: string[]): string | number => {
    return strategyGuide
      .map(parseDesiredMoveStrategyGuide)
      .map(([opp, me]) => getRoundScore(opp, me))
      .reduce(sum, 0);
  },
  solvePartTwo: (strategyGuide: string[]): string | number => {
    return strategyGuide
      .map(parseDesiredOutcomeStrategyGuide)
      .map(([oppMove, desiredOutcome]) =>
        getRoundScore(oppMove, getMyMove(oppMove, desiredOutcome))
      )
      .reduce(sum, 0);
  },
} as Day;
