export const flip = <K extends keyof any, V extends keyof any>(
  record: Record<K, V>
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
