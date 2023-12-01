import { Range } from '../types/common';

export const isRangeWithin = (
  innerRange: Range,
  outerRange: Range,
): boolean => {
  return (
    outerRange.start <= innerRange.start && innerRange.end <= outerRange.end
  );
};

export const doesRangeOverlap = (rangeOne: Range, rangeTwo: Range): boolean => {
  return (
    // Does overlap at the start
    (rangeOne.start >= rangeTwo.start && rangeOne.end <= rangeTwo.start) ||
    // Does overlap at the end
    (rangeOne.end >= rangeTwo.start && rangeOne.end <= rangeTwo.end)
  );
};
