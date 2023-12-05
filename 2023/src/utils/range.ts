import { Range } from '../types/common';

export const isRangeWithin = (
  innerRange: Range,
  outerRange: Range,
): boolean => {
  return (
    outerRange.start <= innerRange.start && innerRange.end <= outerRange.end
  );
};

export const doesRangeOverlap = (a: Range, b: Range): boolean => {
  return a.start <= b.end && a.end >= b.start;

  return (
    // Does overlap at the start
    (a.start >= b.start && a.end <= b.start) ||
    // Does overlap at the end
    (a.end >= b.start && a.end <= b.end)
  );
};

export const getOverlappingRange = (a: Range, b: Range): Range => ({
  start: Math.max(a.start, b.start),
  end: Math.min(a.end, b.end),
});
