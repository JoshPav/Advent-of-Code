import { Day } from "../../types/day";
import { parseSplitPair } from "../../utils/parsing";
import { Range } from "../../types/common";
import { isRangeWithin } from "../../utils/range";

type SectionAssignment = {
  elfOne: Range;
  elfTwo: Range;
};

const parseSectionRange = (range: string): Range =>
  parseSplitPair(range, "-", (start, end) => ({
    start: parseInt(start),
    end: parseInt(end),
  }));

const parseSectionAssignments = (
  sectionAssignments: string
): SectionAssignment =>
  parseSplitPair(sectionAssignments, ",", (rangeOne, rangeTwo) => ({
    elfOne: parseSectionRange(rangeOne),
    elfTwo: parseSectionRange(rangeTwo),
  }));

const doSectionsFullyOverlap = ({
  elfOne,
  elfTwo,
}: SectionAssignment): boolean =>
  isRangeWithin(elfOne, elfTwo) || isRangeWithin(elfTwo, elfOne);

const doesSectionOverlap = (toCheck: Range, section: Range): boolean => {
  return (
    (toCheck.start >= section.start && toCheck.end <= section.start) ||
    (toCheck.end >= section.start && toCheck.end <= section.end)
  );
};

const doSectionsPartiallyOverlap = ({
  elfOne,
  elfTwo,
}: SectionAssignment): boolean => {
  return (
    doesSectionOverlap(elfOne, elfTwo) || doesSectionOverlap(elfTwo, elfOne)
  );
};

export default {
  solvePartOne: (sectionAssignments: string[]): string | number => {
    return sectionAssignments
      .map(parseSectionAssignments)
      .filter(doSectionsFullyOverlap).length;
  },
  solvePartTwo: (sectionAssignments: string[]): string | number => {
    return sectionAssignments
      .map(parseSectionAssignments)
      .filter(doSectionsPartiallyOverlap).length;
  },
} as Day;
