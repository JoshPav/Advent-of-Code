export const parseSplitPair = <T>(
  str: string,
  splitter: string,
  mapper: (a: string, b: string) => T,
): T => {
  const [a, b] = str.split(splitter);
  return mapper(a, b);
};

export const splitOnEmptyLines = (input: string[]): string[][] => {
  const splits: string[][] = [];

  let startOfSplit = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i].trim() === '') {
      splits.push(input.slice(startOfSplit, i));
      startOfSplit = i + 1;
    }
  }
  // Add the last split

  splits.push(input.slice(startOfSplit));

  return splits;
};

export const chunkStr = (toChunk: string, chunkSize: number): string[] => {
  const chunks: string[] = [];

  for (let i = 0; i < toChunk.length; i += chunkSize) {
    chunks.push(toChunk.slice(i, i + chunkSize));
  }

  return chunks;
};

export const splitAndTrim = (str: string) =>
  str.split('\n').map((str) => str.trim());

export const splitOnSpaces = (str: string) => str.trim().split(/\s+/);

export const parseNumbers = (str: string) => splitOnSpaces(str).map(Number);
