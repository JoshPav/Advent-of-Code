import { Day } from '../../types/day';
import {
  doesRangeOverlap,
  getMissingRanges,
  getOverlappingRange,
} from '../../utils/range';
import { Range } from '../../types/common';
import {
  Almanac,
  CategoryConverter,
  MappingRange,
  parseAlmanac,
  parseSeedRanges,
  parseSeeds,
} from './parsing';

const isRangeOverlapping =
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

const getUpdatedRange =
  (category: CategoryConverter) =>
  (seedRange: Range): Range[] => {
    const overlappingRanges = category.mappingRanges.filter(
      isRangeOverlapping(seedRange),
    );

    if (!overlappingRanges.length) {
      return [seedRange];
    }

    return [
      // Ranges that have been mapped to a new destination
      ...overlappingRanges.map(mapRange(seedRange)),
      // Ranges that were not mapped
      ...getMissingRanges(overlappingRanges, seedRange),
    ];
  };

const getUpdatedRanges = (
  convertedRanges: Range[],
  category: CategoryConverter,
): Range[] => convertedRanges.flatMap(getUpdatedRange(category));

const processAlmanac = ({ convertors, seedRanges }: Almanac): number => {
  let convertedRanges = seedRanges;

  convertors.forEach((convertor) => {
    convertedRanges = getUpdatedRanges(convertedRanges, convertor);
  });

  return getLowestSeedLocation(convertedRanges);
};

const getLowestSeedLocation = (seedRanges: Range[]): number =>
  seedRanges.reduce(
    (prev, curr) => Math.min(prev, curr.start),
    Number.MAX_SAFE_INTEGER,
  );

export default {
  solvePartOne: (almanac) => processAlmanac(parseAlmanac(almanac, parseSeeds)),
  solvePartTwo: (almanac) =>
    processAlmanac(parseAlmanac(almanac, parseSeedRanges)),
} as Day;
