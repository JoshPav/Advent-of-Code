import { Day } from '../../types/day';
import { getNumberOfOccurrences } from '../../utils/collections';
import { descending } from '../../utils/sort';

type CardValues = Record<string, number>;

const cardValues: CardValues = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  '1': 1,
};

type CamelPokerHand = {
  cardValues: number[];
  bid: number;
  handType: HandType;
};

enum HandType {
  HIGH_CARD,
  PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

const getOptimalHandType = (
  numberOfOccurrences: number[],
  numberOfJokers: number,
): HandType => {
  const sorted = [...numberOfOccurrences].sort(descending);

  sorted[0] += numberOfJokers;
  return getHandType(sorted);
};

const hasPair = (numberOfOccurrences: number[]) =>
  numberOfOccurrences.includes(2);

const getHandType = (numberOfOccurrences: number[]): HandType => {
  if (numberOfOccurrences.length === 1) {
    return HandType.FIVE_OF_A_KIND;
  }

  if (numberOfOccurrences.includes(4)) {
    return HandType.FOUR_OF_A_KIND;
  }

  if (numberOfOccurrences.includes(3)) {
    return hasPair(numberOfOccurrences)
      ? HandType.FULL_HOUSE
      : HandType.THREE_OF_A_KIND;
  }

  if (hasPair(numberOfOccurrences)) {
    if (numberOfOccurrences.filter((o) => o === 2).length === 2) {
      return HandType.TWO_PAIR;
    }
    return HandType.PAIR;
  }

  return HandType.HIGH_CARD;
};

const compareHands = (a: CamelPokerHand, b: CamelPokerHand): number => {
  if (a.handType === b.handType) {
    for (let i = 0; i < a.cardValues.length; i++) {
      const aCard = a.cardValues[i];
      const bCard = b.cardValues[i];

      if (aCard !== bCard) {
        return aCard - bCard;
      }
    }
  }

  return a.handType - b.handType;
};

type GetHandType = (cards: string) => HandType;

const getHandTypeWithJacks: GetHandType = (cards) =>
  getHandType(getNumberOfOccurrences([...cards]));

const getHandTypeWithJokers: GetHandType = (cards) => {
  const withoutJokers = cards.replace(/J/g, '');
  return getOptimalHandType(
    getNumberOfOccurrences([...withoutJokers]),
    5 - withoutJokers.length,
  );
};

const parseCamelPokerHand =
  (cardStrengths: CardValues, getHandType: GetHandType) =>
  (hand: string): CamelPokerHand => {
    const [cards, bid] = hand.split(' ');

    return {
      bid: Number.parseInt(bid),
      handType: getHandType(cards),
      cardValues: [...cards].map((card) => cardStrengths[card]),
    };
  };

const getHandWinnings = ({ bid }: CamelPokerHand, rank: number) => bid * rank;

const getTotalWinnings = (camelPokerRankings: CamelPokerHand[]): number =>
  camelPokerRankings.reduce(
    (total, hand, index) => total + getHandWinnings(hand, index + 1),
    0,
  );

export default {
  solvePartOne: (input) => {
    const hands = input.map(
      parseCamelPokerHand(cardValues, getHandTypeWithJacks),
    );

    return getTotalWinnings(hands.sort(compareHands));
  },
  solvePartTwo: (input) => {
    const hands = input.map(
      parseCamelPokerHand({ ...cardValues, J: 1 }, getHandTypeWithJokers),
    );

    return getTotalWinnings(hands.sort(compareHands));
  },
} as Day;
