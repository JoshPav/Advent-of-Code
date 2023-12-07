import { Day } from '../../types/day';
import util from 'util';

const specialCardStrengths = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
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

// const compareCards = (a: Card, b: Card)

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

const parseCamelPokerHand = (hand: string): CamelPokerHand => {
  const [cards, bid] = hand.split(' ');

  const parsedCards = [...cards].map((card) => ({
    symbol: card,
    strength: specialCardStrengths[card] || Number.parseInt(card),
  }));

  return {
    bid: Number.parseInt(bid),
    cards: parsedCards,
    handType: getHandType(parsedCards),
  };
};

export default {
  solvePartOne: (input) => {
    const hands = input.map(parseCamelPokerHand);

    // console.log(util.inspect(hands, false, null, true));

    hands.sort(compareHands);

    let totalWinnings = 0;

    for (let rank = 1; rank <= hands.length; rank++) {
      const hand = hands[rank - 1];
      totalWinnings += rank * hand.bid;
    }

    console.log(util.inspect(hands, false, null, true));

    return totalWinnings;
  },
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
