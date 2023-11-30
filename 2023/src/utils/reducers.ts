type Reducer<T> = (prev: T, curr: T) => T;

export const max: Reducer<number> = (prev, curr) => Math.max(prev, curr);

const plusReducer = (prev, curr) => prev + curr;

export const sum: Reducer<number> = plusReducer;

export const concat: Reducer<string> = plusReducer;
