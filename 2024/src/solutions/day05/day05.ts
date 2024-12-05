import { Day, PuzzleInput } from "../../types/day";
import { splitOnEmptyLines } from "../../utils/parsing";
import { sum } from "../../utils/reducers";

type OrderingRules = Record<number, number[]>

type PageUpdate = number[];

type Idk = {
  orderingRules: OrderingRules;
  pageUpdates: PageUpdate[];
}

const parseOrderingRules = (rules: string[]) => rules.reduce((parsedRules, rule) => {
  const [x, y] = rule.split("|");
  
  return {
    ...parsedRules,
    [parseInt(x)]: [...(parsedRules[parseInt(x)] || []), parseInt(y)]
  }
}, {})

const parseInput = (input: PuzzleInput): Idk => {
  const [pageOrderingRules, pageUpdates] = splitOnEmptyLines(input);


  return {
    orderingRules: parseOrderingRules(pageOrderingRules),
    pageUpdates: pageUpdates.map(line => line.split(',').map(Number))
  }
}

const isInOrder = (rules: OrderingRules) => (pageNumbers: PageUpdate) => {

  // console.log(`PAGE: ${pageNumbers}`);
  

  for (let pageNumberIndex = 0; pageNumberIndex < pageNumbers.length; pageNumberIndex++) {
    const pageNumber = pageNumbers[pageNumberIndex];
    
    const cantBeBefore = rules[pageNumber] || []

    // console.log({ pageNumber, cantBeBefore });

    for (let i = 0; i < pageNumberIndex; i++) {
      const curr = pageNumbers[i];

      if (cantBeBefore.includes(curr)) {       
        return false;
      }
      
    }

  }

  return true;
}

const getMiddle = (page: PageUpdate) => page[(page.length - 1) / 2]

export default {
  solvePartOne: (input) => {
    const {orderingRules, pageUpdates } = parseInput(input)

    

    return pageUpdates.filter(isInOrder(orderingRules)).map(getMiddle).reduce(sum, 0)
  },
  solvePartTwo: (input) => {
    return ""
  },
} as Day;
