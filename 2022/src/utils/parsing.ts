export const parseSplitPair = <T>(
  str: string,
  splitter: string,
  mapper: (a: string, b: string) => T
): T => {
  const [a, b] = str.split(splitter);
  return mapper(a, b);
};
