import { Day } from '../../types/day';
import { sum } from '../../utils/reducers';

type ScratchCard = {
  id: string;
  winningNumbers: number[];
  myNumbers: number[];
};

const parseNumbers = (numbers: string): number[] =>
  numbers
    .trim()
    .split(/\s+/)
    .map((num) => Number.parseInt(num));

const parseScratchCard = (line: string): ScratchCard => {
  const [id, numbers] = line.split(':');

  const [winningNumbers, myNumbers] = numbers.split('|');

  return {
    id: id.replace('Card ', ''),
    winningNumbers: parseNumbers(winningNumbers),
    myNumbers: parseNumbers(myNumbers),
  };
};

const isWinningNumber = (winningNumbers: number[]) => (num: number) =>
  winningNumbers.includes(num);

const getCardPoints = ({ myNumbers, winningNumbers }: ScratchCard): number => {
  const totalMatches = myNumbers.filter(isWinningNumber(winningNumbers)).length;
  return totalMatches ? Math.pow(2, totalMatches - 1) : 0;
};

export default {
  solvePartOne: (input) => {
    const scratchCards = input.map(parseScratchCard);

    return scratchCards.map(getCardPoints).reduce(sum, 0);
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
