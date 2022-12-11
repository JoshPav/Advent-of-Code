export type Monkey = {
  items: number[];
  inspected: number;
  getNextMonkey: (worryLevel: number) => number;
  inspectItem: (worryLevel: number) => number;
};

function parseMonkeyItems(items: string): number[] {
  return items
    .split(":")[1]
    .split(",")
    .map((num) => parseInt(num));
}

function parseGetNextMonkey(
  test: string,
  ifTrue: string,
  ifFalse: string
): (worryLevel: number) => number {
  const divisibleBy = parseInt(test.match(/([0-9]+)/g)[0]);
  const whenTrue = parseInt(ifTrue.match(/([0-9]+)/g)[0]);
  const whenFalse = parseInt(ifFalse.match(/([0-9]+)/g)[0]);

  return (worryLevel) =>
    worryLevel % divisibleBy === 0 ? whenTrue : whenFalse;
}

function parseOperation(operation: string): (worryLevel: number) => number {
  const [_, symbol, num] = operation.match(/.*([\*\+]) ([0-9]+|old)/);

  return symbol === "*"
    ? (worryLevel) => worryLevel * (num === "old" ? worryLevel : parseInt(num))
    : (worryLevel) => worryLevel + (num === "old" ? worryLevel : parseInt(num));
}

export function parseMonkeyNote([
  _number,
  startingItems,
  operation,
  test,
  ifTrue,
  ifFalse,
]: string[]): Monkey {
  return {
    items: parseMonkeyItems(startingItems),
    inspected: 0,
    inspectItem: parseOperation(operation),
    getNextMonkey: parseGetNextMonkey(test, ifTrue, ifFalse),
  };
}
