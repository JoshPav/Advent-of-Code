import { log } from 'console';
import { Day } from '../../types/day';
import { parseNumbers, splitOnEmptyLines } from '../../utils/parsing';
import { chunk } from '../../utils/collections';
import { kMaxLength } from 'buffer';
import { doesRangeOverlap } from '../../utils/range';

type CategoryConverter = {
  type: string;
  mappingRanges: MappingRange[];
};

type SeedRange = {
  start: number;
  end: number;
};

type MappingRange = {
  destStart: number;
  sourceStart: number;
  sourceEnd: number;
  rangeLength: number;
};

const parseMappingRange = (range: string): MappingRange => {
  const [destStart, sourceStart, rangeLength] = parseNumbers(range);
  return {
    destStart,
    sourceStart,
    sourceEnd: sourceStart + rangeLength,
    rangeLength,
  };
};

const parseCategoryConverter = (category: string[]): CategoryConverter => {
  const [type, ...ranges] = category;

  return {
    type,
    mappingRanges: ranges.map(parseMappingRange),
  };
};

const isValidForLocation =
  (location: number) =>
  ({ sourceStart, rangeLength }: MappingRange) =>
    sourceStart <= location && location <= sourceStart + rangeLength;

const isRangeOverlapping =
  (seedRange: SeedRange) => (mappingCategory: MappingRange) => {
    return doesRangeOverlap(
      { start: seedRange.start, end: seedRange.end },
      { start: mappingCategory.sourceStart, end: mappingCategory.sourceEnd },
    );
  };

const processOverlappingRange =
  (seedRange: SeedRange) =>
  (overlappingRange: MappingRange): SeedRange[] => {
    const start = Math.max(seedRange.start, overlappingRange.sourceStart);
    const end = Math.min(
      seedRange.end,
      overlappingRange.sourceStart + overlappingRange.rangeLength,
    );

    const diff = start - overlappingRange.sourceStart;

    // console.log({ seedRange, overlappingRange, start, end, diff });

    const newStart = overlappingRange.destStart + diff;
    const newEnd = newStart + (end - start);

    const toReturn = [
      {
        start: newStart,
        end: newEnd,
      },
    ];

    if (seedRange.start < start) {
      toReturn.push({
        start: seedRange.start,
        end: start - 1,
      });
    }

    if (seedRange.end > end) {
      toReturn.push({
        start: end + 1,
        end: seedRange.end,
      });
    }

    const postRange = {
      start: end + 1,
      end: seedRange.end,
    };

    return toReturn;
  };

const getUpdatedRanges = (
  convertedRanges: SeedRange[],
  category: CategoryConverter,
): SeedRange[] => {
  return convertedRanges.flatMap((seedRange) => {
    const overlappingRanges = category.mappingRanges.filter(
      isRangeOverlapping(seedRange),
    );

    if (!overlappingRanges.length) {
      return [seedRange];
    }

    const updatedRanges = overlappingRanges.flatMap(
      processOverlappingRange(seedRange),
    );

    // console.log({ seedRange, overlappingRanges, updatedRanges });

    return updatedRanges;
  });
};

const getUpdatedNumbers = (
  locations: number[],
  convertor: CategoryConverter,
) => {
  return locations.map((location) => {
    const mappingRange = convertor.mappingRanges.filter(
      isValidForLocation(location),
    );

    if (mappingRange.length !== 1) {
      // Any source numbers that aren't mapped correspond to the same destination number
      return location;
    }

    return (
      mappingRange[0].destStart +
      Math.abs(mappingRange[0].sourceStart - location)
    );
  });
};

export default {
  solvePartOne: (almanac) => {
    const [seeds, ...rest] = splitOnEmptyLines(almanac);

    const seedNumbers = parseNumbers(seeds[0].split(':')[1]);

    const categories = rest.map(parseCategoryConverter);

    let convertedLocations = seedNumbers;

    categories.forEach((category) => {
      const updated = getUpdatedNumbers(convertedLocations, category);
      // console.log({ old: convertedLocations, new: updated });
      convertedLocations = updated;
    });

    return Math.min(...convertedLocations);
  },
  solvePartTwo: (almanac) => {
    const [seeds, ...rest] = splitOnEmptyLines(almanac);

    const seedRanges: SeedRange[] = chunk(
      parseNumbers(seeds[0].split(':')[1]),
      2,
    ).map(([start, rangeLength]) => ({ start, end: start + rangeLength }));

    const categories = rest.map(parseCategoryConverter);

    let convertedRanges = seedRanges;

    categories.forEach((category) => {
      const updated = getUpdatedRanges(convertedRanges, category);

      convertedRanges = updated;
    });

    return Math.min(...convertedRanges.map((range) => range.start));
  },
} as Day;
