export const ascending = (a: number, b: number) => a - b;

export const descending = (a: number, b: number) => b - a;

export const funcSortDesc = (arr: number[]) => [...arr].sort(descending);
