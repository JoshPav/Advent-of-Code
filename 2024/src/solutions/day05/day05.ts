import { Day, PuzzleInput } from '../../types/day';
import { getAllCombinations } from '../../utils/collections';
import { splitOnEmptyLines } from '../../utils/parsing';
import { not } from '../../utils/predicate';
import { sum } from '../../utils/reducers';

type OrderingRules = Record<number, number[]>;

type PageUpdate = number[];

type SafetyManualGuide = {
  orderingRules: OrderingRules;
  pageUpdates: PageUpdate[];
};

const parseOrderingRules = (rules: string[]) =>
  rules.reduce((parsedRules, rule) => {
    const [x, y] = rule.split('|');

    return {
      ...parsedRules,
      [parseInt(x)]: [...(parsedRules[parseInt(x)] || []), parseInt(y)],
    };
  }, {});

const parseInput = (input: PuzzleInput): SafetyManualGuide => {
  const [pageOrderingRules, pageUpdates] = splitOnEmptyLines(input);

  return {
    orderingRules: parseOrderingRules(pageOrderingRules),
    pageUpdates: pageUpdates.map((line) => line.split(',').map(Number)),
  };
};

const getPrevPageNumbers = (pageNumbers: PageUpdate, currIndex: number) =>
  pageNumbers.slice(0, currIndex);

const satifiesOrdering =
  (cantBeBefore: number[] = []) =>
  (num: number) =>
    !cantBeBefore.includes(num);

const isInOrder = (rules: OrderingRules) => (pageNumbers: PageUpdate) =>
  pageNumbers.every((pageNumber, pageNumberIndex) =>
    getPrevPageNumbers(pageNumbers, pageNumberIndex).every(
      satifiesOrdering(rules[pageNumber]),
    ),
  );

const getMiddle = (page: PageUpdate) => page[(page.length - 1) / 2];


export default {
  solvePartOne: (input) => {
    const { orderingRules, pageUpdates } = parseInput(input);

    return pageUpdates
      .filter(isInOrder(orderingRules))
      .map(getMiddle)
      .reduce(sum, 0);
  },
  solvePartTwo: (input) => {
    const { orderingRules, pageUpdates } = parseInput(input);

    const getRelevantRules = (num: number, update: PageUpdate) => (orderingRules[num] || []).filter(val => update.includes(val))

    type PageWithRules = {
      page: number;
      rules: number[]
    }

    const sortPageWithRules = ({ rules: aRules}: PageWithRules, { rules: bRules}: PageWithRules) => bRules.length - aRules.length

    const getPage = ({ page }: PageWithRules) => page

    return pageUpdates
      .filter(not(isInOrder(orderingRules)))
      .map(update => update.map(page => ({ page, rules: getRelevantRules(page, update) })))
      .map(val => val.sort(sortPageWithRules).map(getPage))
      .map(getMiddle)
      .reduce(sum, 0);
  },
} as Day;
