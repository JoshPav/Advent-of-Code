type Reducer<T> = (prev: T, curr: T) => T;

export const max: Reducer<number> = (prev, curr) => Math.max(prev, curr);

export const sum: Reducer<number> = (prev, curr) => prev + curr;
