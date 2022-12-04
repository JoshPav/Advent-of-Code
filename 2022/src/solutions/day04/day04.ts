import { Day } from "../../types/day";

type SectionRange = {
  start: number;
  end: number;
};

type SectionAssignment = {
  elfOne: SectionRange;
  elfTwo: SectionRange;
};
const parseSectionRange = (sectionRange: string): SectionRange => {
  const [start, end] = sectionRange.split("-");
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
};

const parseSectionAssignments = (
  sectionAssignments: string
): SectionAssignment => {
  const [elfOneRange, elfTwoRange] = sectionAssignments.split(",");

  return {
    elfOne: parseSectionRange(elfOneRange),
    elfTwo: parseSectionRange(elfTwoRange),
  };
};

const isSectionWithin = (
  toCheck: SectionRange,
  section: SectionRange
): boolean => {
  return section.start <= toCheck.start && toCheck.end <= section.end;
};

const doSectionsFullyOverlap = ({
  elfOne,
  elfTwo,
}: SectionAssignment): boolean => {
  return isSectionWithin(elfOne, elfTwo) || isSectionWithin(elfTwo, elfOne);
};

const doesSectionOverlap = (
  toCheck: SectionRange,
  section: SectionRange
): boolean => {
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
