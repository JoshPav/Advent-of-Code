import { splitOnEmptyLines, parseNumbers } from '../../utils/parsing';
import { Range } from '../../types/common';
import { chunk } from '../../utils/collections';

export type CategoryConverter = {
  type: string;
  mappingRanges: MappingRange[];
};

export type MappingRange = Range & {
  destination: number;
};

export type AlmanacSeedParser = (input: number[]) => Range[];

export type Almanac = {
  seedRanges: Range[];
  convertors: CategoryConverter[];
};

export const parseSeeds: AlmanacSeedParser = (values) =>
  values.map((seedNo) => ({
    start: seedNo,
    end: seedNo,
  }));

export const parseSeedRanges: AlmanacSeedParser = (values) =>
  chunk(values, 2).map(([start, rangeLength]) => ({
    start,
    end: start + rangeLength,
  }));

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

export const parseAlmanac = (
  almanac: string[],
  seedParser: AlmanacSeedParser,
) => {
  const [seeds, ...convertors] = splitOnEmptyLines(almanac);

  return {
    seedRanges: seedParser(parseNumbers(seeds[0].split(':')[1])),
    convertors: convertors.map(parseCategoryConverter),
  };
};
