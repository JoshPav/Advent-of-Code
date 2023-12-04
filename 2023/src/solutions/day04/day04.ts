import { Day } from '../../types/day';
import { sum, sumNested } from '../../utils/reducers';

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

const getCardMatches = ({ myNumbers, winningNumbers }: ScratchCard) =>
  myNumbers.filter(isWinningNumber(winningNumbers)).length;

const getCardPoints = (card: ScratchCard): number => {
  const totalMatches = getCardMatches(card);
  return totalMatches ? Math.pow(2, totalMatches - 1) : 0;
};

type ScratchCardWithQuantity = {
  quantity: number;
  card: ScratchCard;
};

const logPile = (cardPile: ScratchCardWithQuantity[]) => {
  const toLog = cardPile
    .map((card) => `${card.card.id}: ${card.quantity}`)
    .join('\n');
  console.log(toLog);
};

const processScratchCards = (
  cardPile: ScratchCardWithQuantity[],
): ScratchCardWithQuantity[] => {
  for (let i = 0; i < cardPile.length; i++) {
    const { card, quantity } = cardPile[i];

    const matches = getCardMatches(card);

    // console.log({ id: card.id, matches });

    // Update quantities
    for (let j = 0; j < matches; j++) {
      const index = i + 1 + j;

      if (index >= cardPile.length) {
        break;
      }

      cardPile[index].quantity += quantity;
    }

    // logPile(cardPile);
  }

  return cardPile;
};

export default {
  solvePartOne: (input) =>
    input.map(parseScratchCard).map(getCardPoints).reduce(sum, 0),
  solvePartTwo: (input) => {
    const scratchCardsPile = input.map((line) => ({
      quantity: 1,
      card: parseScratchCard(line),
    }));

    const processedScratchCards = processScratchCards(scratchCardsPile);

    return processedScratchCards.reduce(sumNested('quantity'), 0);
  },
} as Day;
