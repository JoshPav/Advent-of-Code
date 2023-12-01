import fs = require('fs');

export function readFile(fileName: string): string[] {
  return fs.readFileSync(fileName, 'utf8').toString().split('\n');
}

export function readFileForDay(dayNumber: string): string[] {
  // Remove if ends in new line
  const fileContents = readFile(`src/data/day${dayNumber}.txt`);

  if (fileContents[fileContents.length - 1] === '') {
    return fileContents.slice(0, -1);
  }
  return fileContents;
}
