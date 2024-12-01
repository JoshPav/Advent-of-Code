type Reducer<T> = (prev: T, curr: T) => T;

export const max: Reducer<number> = (prev, curr) => Math.max(prev, curr);

function plusReducer(prev: number, curr: number): number;
function plusReducer(prev: string, curr: string): string;
function plusReducer(prev: any, curr: any) {
  return prev + curr;
}

export const sum: Reducer<number> = plusReducer;

export const product: Reducer<number> = (prev, curr) => prev * curr;

export const sumNested =
  <T>(field: keyof T) =>
  (prev: number, curr: T) =>
    prev + (curr[field] as number);

export const concat: Reducer<string> = plusReducer;
