import fs = require('fs')


export function readFile(fileName: string): string[] {
    return fs.readFileSync(fileName, 'utf8').toString().split('\n')
}

export function readFileForDay(dayNumber: number): string[] {
    return readFile(`data/day${withLeadingZero(dayNumber)}.txt`)
}

function withLeadingZero(number: number): string {
    return `00${number}`.slice(-2)
}