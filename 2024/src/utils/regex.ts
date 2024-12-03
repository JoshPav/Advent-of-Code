export const parseRegexp =
  <T>(regexp: RegExp, parser: (match: string[]) => T) =>
  (input: string): T[] => {
    let match = regexp.exec(input);

    const matches: T[] = [];

    while (match) {
      matches.push(parser(match));

      match = regexp.exec(input);
    }

    return matches;
  };
