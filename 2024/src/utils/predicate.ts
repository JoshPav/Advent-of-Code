export type Predicate<T = unknown> = (args: T) => boolean;

export const not =
  <T extends Predicate>(pred: T) =>
  (...args: Parameters<Predicate>) =>
    !pred(...args);
