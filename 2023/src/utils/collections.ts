export const flip = <K extends keyof any, V extends keyof any>(
  record: Record<K, V>,
): Record<V, K> =>
  Object.fromEntries(Object.entries(record).map((arr) => arr.reverse()));

export const intersection = <T>(arr1: T[], arr2: T[]) =>
  [...new Set(arr1)].filter((ele) => arr2.includes(ele));

export const chunk = <T>(toChunk: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < toChunk.length; i += chunkSize) {
    chunks.push(toChunk.slice(i, i + chunkSize));
  }

  return chunks;
};

export const buildArray = <T>(size: number, getDefaultVal: () => T): T[] => {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr.push(getDefaultVal());
  }
  return arr;
};

export const flipGrid = <T>(arr: T[][]): T[][] => {
  const newGrid: T[][] = [];

  for (let i = 0; i < arr[0].length; i++) {
    const gridSlice: T[] = [];

    for (let j = 0; j < arr.length; j++) {
      gridSlice.push(arr[j][i]);
    }

    newGrid.push(gridSlice);
  }

  return newGrid;
};

export const getLast = <T>(arr: T[]): T => arr[arr.length - 1];

export const isDistinct = <T>(arr: T[]): boolean =>
  arr.length === new Set(arr).size;

export const addWithCap = <T>(arr: T[], item: T, cap: number): T[] => {
  return [...arr.slice(-1 * (cap - 1)), item];
};
