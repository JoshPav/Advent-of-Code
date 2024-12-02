const greatestCommonDivisor = (a: number, b: number) =>
  a ? greatestCommonDivisor(b % a, a) : b;

export const leastCommonMultiple = (a: number, b: number) =>
  (a * b) / greatestCommonDivisor(a, b);

export const isPositive = (x: number) => x > 0
export const isNegative = (x: number) => x < 0

export const allPositive = (arr: number[]) => arr.every(isPositive);
export const allNegative = (arr: number[]) => arr.every(isNegative);

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
