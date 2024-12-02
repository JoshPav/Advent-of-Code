type Predicate = (args: unknown) => boolean;

export const not =
  <T extends Predicate>(pred: T) =>
  (...args: Parameters<Predicate>) =>
    !pred(...args);
