import { Day } from '../../types/day';
import util from 'util';

const specialCardStrengths = {
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

type Card = {
  symbol: string;
  strength: number;
};

type CamelPokerHand = {
  cards: Card[];
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

const getHandType = (cards: Card[]): HandType => {
  const numberOfOccurrences = Object.values(
    cards.reduce(
      (tally, card) => {
        if (tally[card.symbol]) {
          tally[card.symbol] += 1;
        } else {
          tally[card.symbol] = 1;
        }
        return tally;
      },
      {} as Record<string, number>,
    ),
  );

  if (numberOfOccurrences.length === 1) {
    return HandType.FIVE_OF_A_KIND;
  }

  if (numberOfOccurrences.includes(4)) {
    return HandType.FOUR_OF_A_KIND;
  }

  if (numberOfOccurrences.includes(3)) {
    if (numberOfOccurrences.includes(2)) {
      return HandType.FULL_HOUSE;
    }
    return HandType.THREE_OF_A_KIND;
  }

  if (numberOfOccurrences.includes(2)) {
    if (numberOfOccurrences.filter((o) => o === 2).length === 2) {
      return HandType.TWO_PAIR;
    }
    return HandType.PAIR;
  }

  return HandType.HIGH_CARD;
};

const compareHands = (a: CamelPokerHand, b: CamelPokerHand): number => {
  if (a.handType === b.handType) {
    for (let i = 0; i < a.cards.length; i++) {
      const aCard = a.cards[i];
      const bCard = b.cards[i];

      if (aCard.strength !== bCard.strength) {
        return aCard.strength - bCard.strength;
      }
    }
  }

  return a.handType - b.handType;
};

const compareHandsPt2 = (
  a: { originalHand: CamelPokerHand; updated: CamelPokerHand },
  b: { originalHand: CamelPokerHand; updated: CamelPokerHand },
): number => {
  if (a.updated.handType === b.updated.handType) {
    for (let i = 0; i < a.originalHand.cards.length; i++) {
      const aCard = a.originalHand.cards[i];
      const bCard = b.originalHand.cards[i];

      if (aCard.strength !== bCard.strength) {
        return aCard.strength - bCard.strength;
      }
    }
  }

  return a.updated.handType - b.updated.handType;
};

const parseCamelPokerHand = (hand: string, isPart2 = false): CamelPokerHand => {
  const [cards, bid] = hand.split(' ');

  const parsedCards = [...cards].map((card) => ({
    symbol: card,
    strength: isPart2 && card === 'J' ? 1 : specialCardStrengths[card],
  }));

  // console.log(parsedCards);

  return {
    bid: Number.parseInt(bid),
    cards: parsedCards,
    handType: getHandType(parsedCards),
  };
};

const exceptJoker = {
  A: 14,
  K: 13,
  Q: 12,
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

export const getOptimalHand = (cards: string): string => {
  const numberOfJokers = [...cards].filter((card) => card === 'J').length;

  if (numberOfJokers === 0) {
    return cards;
  }

  const jokerIndex = cards.indexOf('J');

  let allHands = Object.keys(exceptJoker).map((symbol) => {
    return cards.slice(0, jokerIndex) + symbol + cards.slice(jokerIndex + 1);
  });

  // console.log({ allHands });

  const remainingJokers = numberOfJokers - 1;

  if (remainingJokers) {
    allHands = allHands.map((hand) => getOptimalHand(hand));
  }

  const parsed = allHands.map((hand) => ({
    parsed: parseCamelPokerHand(hand, true),
    hand,
  }));

  parsed.sort((a, b) => compareHands(a.parsed, b.parsed));
  return parsed[parsed.length - 1].hand;
};

// First guess: 253371374

const parseCamelPokerHandPt2 = (hand: string) => {
  const originalHand = parseCamelPokerHand(hand, true);
  // console.log(originalHand);

  const hello = getOptimalHand(hand);

  return { originalHand, updated: parseCamelPokerHand(hello, true) };
};

export default {
  solvePartOne: (input) => {
    const hands = input.map((idk) => parseCamelPokerHand(idk));

    hands.sort(compareHands);

    let totalWinnings = 0;

    for (let rank = 1; rank <= hands.length; rank++) {
      const hand = hands[rank - 1];
      totalWinnings += rank * hand.bid;
    }

    return totalWinnings;
  },
  solvePartTwo: (input) => {
    const hands = input.map(parseCamelPokerHandPt2);

    hands.sort((a, b) => compareHandsPt2(a, b));

    let totalWinnings = 0;

    for (let rank = 1; rank <= hands.length; rank++) {
      const hand = hands[rank - 1].originalHand;
      totalWinnings += rank * hand.bid;
    }

    return totalWinnings;
  },
} as Day;
