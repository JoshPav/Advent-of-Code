import { Range } from '../types/common';
import { Point } from '../types/geometry';

export const isRangeWithin = (
  innerRange: Range,
  outerRange: Range,
): boolean => {
  return (
    outerRange.start <= innerRange.start && innerRange.end <= outerRange.end
  );
};

export const isWithinRange = (range: Range) => (num: number) =>
  range.start <= num && num <= range.end;

const getRange = (a: number, b: number): Range => ({
  start: Math.min(a, b),
  end: Math.max(a, b),
});

export const getRanges = (a: Point, b: Point) => ({
  x: getRange(a.x, b.x),
  y: getRange(a.y, b.y),
});

export const doesRangeOverlap = (a: Range, b: Range): boolean =>
  a.start <= b.end && a.end >= b.start;

export const getOverlappingRange = (a: Range, b: Range): Range => ({
  start: Math.max(a.start, b.start),
  end: Math.min(a.end, b.end),
});

const getRangeGaps = (ranges: Range[]): Range[] => {
  const gaps: Range[] = [];

  for (let i = 0; i < ranges.length; i++) {
    const start = ranges[i].end;
    const end = ranges[i + 1]?.start;

    if (start < end) {
      gaps.push({
        start: start + 1,
        end: end - 1,
      });
    }
  }

  return gaps;
};

export const getMissingRanges = (
  rangesOriginal: Range[],
  fullRange: Range,
): Range[] => {
  const ranges = [...rangesOriginal];
  ranges.sort((a, b) => a.start - b.start);

  const gaps: Range[] = [
    { start: Number.NEGATIVE_INFINITY, end: ranges[0].start - 1 },
    ...getRangeGaps(ranges),
    { start: ranges[ranges.length - 1].end + 1, end: Number.POSITIVE_INFINITY },
  ];

  return gaps
    .filter((gap) => doesRangeOverlap(gap, fullRange))
    .map((gap) => ({
      start: Math.max(gap.start, fullRange.start),
      end: Math.min(gap.end, fullRange.end),
    }));
};
