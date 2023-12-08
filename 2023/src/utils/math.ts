const greatestCommonDivisor = (a: number, b: number) =>
  a ? greatestCommonDivisor(b % a, a) : b;

export const leastCommonMultiple = (a: number, b: number) =>
  (a * b) / greatestCommonDivisor(a, b);
