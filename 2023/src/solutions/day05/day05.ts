import { Day } from '../../types/day';
import { parseNumbers, splitOnEmptyLines } from '../../utils/parsing';
import { chunk } from '../../utils/collections';
import { doesRangeOverlap, getOverlappingRange } from '../../utils/range';
import { Range } from '../../types/common';

export type CategoryConverter = {
  type: string;
  mappingRanges: MappingRange[];
};

export type MappingRange = Range & {
  destination: number;
};

const parseMappingRange = (range: string): MappingRange => {
  const [destStart, sourceStart, rangeLength] = parseNumbers(range);
  return {
    destination: destStart,
    start: sourceStart,
    end: sourceStart + rangeLength,
  };
};

const parseCategoryConverter = (category: string[]): CategoryConverter => {
  const [type, ...ranges] = category;

  return {
    type,
    mappingRanges: ranges.map(parseMappingRange),
  };
};

export const isRangeOverlapping =
  (seedRange: Range) => (mappingCategory: MappingRange) =>
    doesRangeOverlap(seedRange, mappingCategory);

const getMappedRange = (
  overlappingRange: Range,
  mappingRange: MappingRange,
) => {
  const rangeSize = overlappingRange.end - overlappingRange.start;

  const diff = overlappingRange.start - mappingRange.start;

  const newStart = mappingRange.destination + diff;
  const newEnd = newStart + rangeSize;

  return {
    start: newStart,
    end: newEnd,
  };
};

const mapRange =
  (seedRange: Range) =>
  (mappingRange: MappingRange): Range => {
    const overlappingRange = getOverlappingRange(seedRange, mappingRange);

    return getMappedRange(overlappingRange, mappingRange);
  };

export const processOverlappingRange =
  (seedRange: Range) =>
  (mappingRange: MappingRange): Range[] => {
    const overlappingRange = getOverlappingRange(seedRange, mappingRange);

    const mappedRange = getMappedRange(overlappingRange, mappingRange);

    const toReturn = [mappedRange];

    if (seedRange.start < overlappingRange.start) {
      toReturn.push({
        start: seedRange.start,
        end: overlappingRange.start - 1,
      });
    }

    if (seedRange.end > overlappingRange.end) {
      toReturn.push({
        start: overlappingRange.end + 1,
        end: seedRange.end,
      });
    }

    return toReturn;
  };

type RangeType = [number, number];
type RangesType = RangeType[];

const getGaps = (ranges: RangesType): RangesType => {
  const gaps = [];

  for (const index in ranges) {
    const start = ranges[Number(index)][1];
    const end = ranges[Number(index) + 1]?.[0];

    if (start < end) {
      gaps.push([start + 1, end - 1]);
    }
  }

  return gaps;
};

const isRangeOverlapping2 = (
  [aStart, aEnd]: RangeType,
  [bStart, bEnd]: RangeType,
) =>
  doesRangeOverlap({ start: aStart, end: aEnd }, { start: bStart, end: bEnd });

const getMissingRanges = (
  ranges: RangesType,
  from: number,
  to: number,
): RangesType => {
  if (ranges.length === 0) {
    return [[from, to]];
  }

  const gaps: RangesType = [
    [Number.NEGATIVE_INFINITY, ranges[0][0] - 1],
    ...getGaps(ranges),
    [ranges[ranges.length - 1][1] + 1, Number.POSITIVE_INFINITY],
  ];

  return gaps
    .filter((gap) => {
      return isRangeOverlapping2(gap, [from, to]);
    })
    .map((gap) => {
      return [Math.max(gap[0], from), Math.min(gap[1], to)];
    });
};

const getRangeGaps = (fullRange: Range, ranges: Range[]): Range[] => {
  const sorted = [...ranges];
  ranges.sort((a, b) => a.start - b.start);

  return [];
};

export const getUpdatedRange =
  (category: CategoryConverter) =>
  (seedRange: Range): Range[] => {
    const overlappingRanges = category.mappingRanges.filter(
      isRangeOverlapping(seedRange),
    );

    if (!overlappingRanges.length) {
      return [seedRange];
    }

    const mappedRanges = overlappingRanges.map(mapRange(seedRange));

    const untouchedRanges = getRangeGaps(seedRange, overlappingRanges);

    const missing = getMissingRanges(
      overlappingRanges.map((range) => [range.start, range.end]),
      seedRange.start,
      seedRange.end,
    );

    return [
      ...mappedRanges,
      ...missing.map((missingRange) => ({
        start: missingRange[0],
        end: missingRange[1],
      })),
    ];
  };

export const getUpdatedRanges = (
  convertedRanges: Range[],
  category: CategoryConverter,
): Range[] => convertedRanges.flatMap(getUpdatedRange(category));

const parseSeeds: AlmanacSeedParser = (values) =>
  values.map((seedNo) => ({
    start: seedNo,
    end: seedNo,
  }));

const parseSeedRanges: AlmanacSeedParser = (values) =>
  chunk(values, 2).map(([start, rangeLength]) => ({
    start,
    end: start + rangeLength,
  }));

type AlmanacSeedParser = (input: number[]) => Range[];

type Almanac = {
  seedRanges: Range[];
  convertors: CategoryConverter[];
};

const parseAlmanac = (almanac: string[], seedParser: AlmanacSeedParser) => {
  const [seeds, ...convertors] = splitOnEmptyLines(almanac);

  return {
    seedRanges: seedParser(parseNumbers(seeds[0].split(':')[1])),
    convertors: convertors.map(parseCategoryConverter),
  };
};

const processAlmanac = (
  { convertors, seedRanges }: Almanac,
  lines = [],
): number => {
  let convertedRanges = seedRanges;

  const idk = [seedRanges];

  convertors.forEach((convertor) => {
    const updated = getUpdatedRanges(convertedRanges, convertor);

    convertedRanges = updated;
    idk.push(updated);
  });

  return getLowestSeedLocation(convertedRanges);
};

const getLowestSeedLocation = (seedRanges: Range[]): number =>
  seedRanges.reduce(
    (prev, curr) => Math.min(prev, curr.start),
    Number.MAX_SAFE_INTEGER,
  );

export default {
  solvePartOne: (almanac) =>
    processAlmanac(parseAlmanac(almanac, parseSeeds), almanac),
  solvePartTwo: (almanac) =>
    processAlmanac(parseAlmanac(almanac, parseSeedRanges), almanac),
} as Day;
