export const descendingSort = (a: number, b: number) => b - a;

export const funcSortDesc = (arr: number[]) => [...arr].sort(descendingSort);
