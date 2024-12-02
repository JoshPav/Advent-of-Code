const greatestCommonDivisor = (a: number, b: number) =>
  a ? greatestCommonDivisor(b % a, a) : b;

export const leastCommonMultiple = (a: number, b: number) =>
  (a * b) / greatestCommonDivisor(a, b);

export const allPositive = (arr: number[]) => arr.every((x) => x > 0);
export const allNegative = (arr: number[]) => arr.every((x) => x < 0);

export const getDifferences = (
  arr: number[],
  absOrRel: 'abs' | 'rel' = 'rel',
) => {
  const diffs: number[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i] - arr[i + 1];
    diffs.push(absOrRel === 'rel' ? diff : Math.abs(diff));
  }
  return diffs;
};
