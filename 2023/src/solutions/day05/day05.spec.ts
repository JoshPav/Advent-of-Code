import { Range } from '../../types/common';
import { PuzzleExample } from '../../types/examples';
import { readFileForDay } from '../../utils/io';
import { splitAndTrim } from '../../utils/parsing';
import { withSameInput } from '../../utils/testUtils';
import day05, {
  CategoryConverter,
  getUpdatedRange,
  getUpdatedRanges,
  processOverlappingRange,
} from './day05';

const getPartOneExamples = (): PuzzleExample[] => [
  {
    input: splitAndTrim(`seeds: 79 14 55 13

  seed-to-soil map:
  50 98 2
  52 50 48
  
  soil-to-fertilizer map:
  0 15 37
  37 52 2
  39 0 15
  
  fertilizer-to-water map:
  49 53 8
  0 11 42
  42 0 7
  57 7 4
  
  water-to-light map:
  88 18 7
  18 25 70
  
  light-to-temperature map:
  45 77 23
  81 45 19
  68 64 13
  
  temperature-to-humidity map:
  0 69 1
  1 0 69
  
  humidity-to-location map:
  60 56 37
  56 93 4`),
    expected: 35,
  },
  {
    input: readFileForDay('05'),
    expected: 322500873,
  },
];

const getPartTwoExamples = (): PuzzleExample[] =>
  withSameInput(getPartOneExamples(), [46, 108956227]);

describe('Day 05 examples', () => {
  describe('Part one examples', () => {
    it.each(getPartOneExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day05.solvePartOne(input)).toBe(expected);
      },
    );
  });

  // describe('getUpdatedRange', () => {
  //   type GetUpdatedRangeParam = {
  //     seedRange: Range;
  //     category: CategoryConverter;
  //     expected: Range[];
  //   };

  //   it.each<GetUpdatedRangeParam>([
  //     {
  //       seedRange: {
  //         start: 1367444651,
  //         end: 1467365318,
  //       },
  //       category: {
  //         type: '',
  //         mappingRanges: [
  //           {
  //             destination: 0,
  //             start: 1520731987,
  //             end: 1760392420,
  //           },
  //         ],
  //       },
  //       expected: [
  //         {
  //           start: 1367444651,
  //           end: 1467365318,
  //         },
  //       ],
  //     },
  //     {
  //       seedRange: {
  //         start: 1367444651,
  //         end: 1467365318,
  //       },
  //       category: {
  //         type: '',
  //         mappingRanges: [
  //           {
  //             destination: 0,
  //             start: 1231231,
  //             end: 53242343,
  //           },
  //         ],
  //       },
  //       expected: [
  //         {
  //           start: 1367444651,
  //           end: 1467365318,
  //         },
  //       ],
  //     },
  //   ])(
  //     'should process ranges with no overlap',
  //     ({ seedRange, category, expected }) => {
  //       expect(getUpdatedRange(category)(seedRange)).toEqual(expected);
  //     },
  //   );

  //   it('broken bit', () => {
  //     const seedRange = {
  //       start: 3319921504,
  //       end: 3473257186,
  //     };

  //     const category = {
  //       type: 'seed-to-soil map:',
  //       mappingRanges: [
  //         {
  //           destination: 873256303,
  //           start: 3438158294,
  //           end: 3441558795,
  //         },
  //         {
  //           destination: 3338810960,
  //           start: 408700040,
  //           end: 508169608,
  //         },
  //         {
  //           destination: 876656804,
  //           start: 586381004,
  //           end: 642348400,
  //         },
  //         {
  //           destination: 2937187724,
  //           start: 3352513245,
  //           end: 3438158294,
  //         },
  //         {
  //           destination: 3633224442,
  //           start: 4294716315,
  //           end: 4294967296,
  //         },
  //         {
  //           destination: 4063203128,
  //           start: 3993405594,
  //           end: 4225169762,
  //         },
  //         {
  //           destination: 628606346,
  //           start: 884567853,
  //           end: 969732099,
  //         },
  //         {
  //           destination: 1848085960,
  //           start: 2225191252,
  //           end: 2553370576,
  //         },
  //         {
  //           destination: 1686068310,
  //           start: 2992301693,
  //           end: 3154319343,
  //         },
  //         {
  //           destination: 1456962076,
  //           start: 179593806,
  //           end: 408700040,
  //         },
  //         {
  //           destination: 0,
  //           start: 1520731987,
  //           end: 1760392420,
  //         },
  //         {
  //           destination: 2759350898,
  //           start: 1833519805,
  //           end: 2011356631,
  //         },
  //         {
  //           destination: 494634602,
  //           start: 642348400,
  //           end: 710277820,
  //         },
  //         {
  //           destination: 3022832773,
  //           start: 758696310,
  //           end: 884567853,
  //         },
  //         {
  //           destination: 3563677889,
  //           start: 4225169762,
  //           end: 4294716315,
  //         },
  //         {
  //           destination: 2637775123,
  //           start: 710277820,
  //           end: 758696310,
  //         },
  //         {
  //           destination: 3148704316,
  //           start: 969732099,
  //           end: 1082312597,
  //         },
  //         {
  //           destination: 3261284814,
  //           start: 2623022420,
  //           end: 2700548566,
  //         },
  //         {
  //           destination: 489910414,
  //           start: 174869618,
  //           end: 179593806,
  //         },
  //         {
  //           destination: 1187482559,
  //           start: 2700548566,
  //           end: 2970028083,
  //         },
  //         {
  //           destination: 713770592,
  //           start: 2139594657,
  //           end: 2225191252,
  //         },
  //         {
  //           destination: 850982693,
  //           start: 2970028083,
  //           end: 2992301693,
  //         },
  //         {
  //           destination: 932624200,
  //           start: 2013609609,
  //           end: 2139594657,
  //         },
  //         {
  //           destination: 799367187,
  //           start: 1082312597,
  //           end: 1133928103,
  //         },
  //         {
  //           destination: 3633475423,
  //           start: 3563677889,
  //           end: 3993405594,
  //         },
  //         {
  //           destination: 562564022,
  //           start: 3283192654,
  //           end: 3349234978,
  //         },
  //         {
  //           destination: 2181319395,
  //           start: 2553370576,
  //           end: 2623022420,
  //         },
  //         {
  //           destination: 2250971239,
  //           start: 1133928103,
  //           end: 1520731987,
  //         },
  //         {
  //           destination: 3438280528,
  //           start: 3349234978,
  //           end: 3352513245,
  //         },
  //         {
  //           destination: 2686193613,
  //           start: 513223719,
  //           end: 586381004,
  //         },
  //         {
  //           destination: 239660433,
  //           start: 1760392420,
  //           end: 1833519805,
  //         },
  //         {
  //           destination: 487657436,
  //           start: 2011356631,
  //           end: 2013609609,
  //         },
  //         {
  //           destination: 312787818,
  //           start: 0,
  //           end: 174869618,
  //         },
  //         {
  //           destination: 1058609248,
  //           start: 3154319343,
  //           end: 3283192654,
  //         },
  //         {
  //           destination: 2176265284,
  //           start: 508169608,
  //           end: 513223719,
  //         },
  //       ],
  //     };

  //     const expected = [
  //       {
  //         start: 873256303,
  //         end: 876656804,
  //       },
  //       {
  //         start: 2937187724,
  //         end: 3022832773,
  //       },
  //       {
  //         start: 599292872,
  //         end: 628606346,
  //       },
  //       {
  //         start: 3438280528,
  //         end: 3441558795,
  //       },
  //       {
  //         start: 3441558795,
  //         end: 3473257186,
  //       },
  //     ];

  //     expect(getUpdatedRange(category)(seedRange)).toEqual(expected);
  //   });

  //   it('should map multiple ranges', () => {
  //     const seedRange = {
  //       start: 30,
  //       end: 80,
  //     };
  //     const category = {
  //       type: '',
  //       mappingRanges: [
  //         {
  //           destination: 0,
  //           start: 0,
  //           end: 20,
  //         },
  //         {
  //           destination: 100,
  //           start: 40,
  //           end: 50,
  //         },
  //         {
  //           destination: 200,
  //           start: 60,
  //           end: 70,
  //         },
  //       ],
  //     };

  //     const a = getUpdatedRange(category)(seedRange);
  //     a.sort((a, b) => a.start - b.start);

  //     const expected = [
  //       {
  //         start: 30,
  //         end: 39,
  //       },
  //       {
  //         start: 100,
  //         end: 110,
  //       },
  //       {
  //         start: 51,
  //         end: 59,
  //       },
  //       {
  //         start: 200,
  //         end: 210,
  //       },
  //       {
  //         start: 71,
  //         end: 80,
  //       },
  //     ];
  //     expected.sort((a, b) => a.start - b.start);

  //     expect(a).toEqual(expected);
  //   });

  //   it('should map the whole range', () => {
  //     const seedRange = {
  //       start: 30,
  //       end: 40,
  //     };
  //     const category = {
  //       type: '',
  //       mappingRanges: [
  //         {
  //           destination: 100,
  //           start: 0,
  //           end: 60,
  //         },
  //       ],
  //     };

  //     expect(getUpdatedRange(category)(seedRange)).toEqual([
  //       {
  //         start: 130,
  //         end: 140,
  //       },
  //     ]);
  //   });

  //   it('should process range with overlap', () => {
  //     const seedRange = {
  //       start: 12,
  //       end: 18,
  //     };
  //     const category = {
  //       type: '',
  //       mappingRanges: [
  //         {
  //           destination: 70,
  //           start: 0,
  //           end: 30,
  //         },
  //       ],
  //     };

  //     expect(getUpdatedRange(category)(seedRange)).toEqual([
  //       {
  //         start: 82,
  //         end: 88,
  //       },
  //     ]);
  //   });

  //   it('should process seedRange with larger than mappingRange', () => {
  //     const seedRange = {
  //       start: 10,
  //       end: 60,
  //     };
  //     const category = {
  //       type: '',
  //       mappingRanges: [
  //         {
  //           destination: 100,
  //           start: 30,
  //           end: 40,
  //         },
  //       ],
  //     };
  //     expect(getUpdatedRange(category)(seedRange)).toEqual([
  //       {
  //         start: 100,
  //         end: 110,
  //       },
  //       {
  //         start: 10,
  //         end: 29,
  //       },
  //       {
  //         start: 41,
  //         end: 60,
  //       },
  //     ]);
  //   });
  // });

  describe('Part two examples', () => {
    it.each(getPartTwoExamples())(
      'should return expected',
      ({ input, expected }) => {
        expect(day05.solvePartTwo(input)).toBe(expected);
      },
    );
  });
});
