import { log } from 'console';
import { Day } from '../../types/day';
import { parseNumbers, splitOnEmptyLines } from '../../utils/parsing';

type CategoryConverter = {
  type: string;
  mappingRanges: MappingRange[];
};

type MappingRange = {
  destStart: number;
  sourceStart: number;
  rangeLength: number;
};

const parseMappingRange = (range: string): MappingRange => {
  const [destStart, sourceStart, rangeLength] = parseNumbers(range);
  return {
    destStart,
    sourceStart,
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
  solvePartTwo: (input) => {
    return '';
  },
} as Day;
