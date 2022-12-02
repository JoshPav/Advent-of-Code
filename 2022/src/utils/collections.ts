export const flip = <K extends keyof any, V extends keyof any>(
  record: Record<K, V>
): Record<V, K> =>
  Object.fromEntries(Object.entries(record).map((arr) => arr.reverse()));
