import fs = require('fs')


export function readFile(fileName: string): string[] {
    return fs.readFileSync(fileName, 'utf8').toString().split('\n')
}

export function readFileForDay(dayNumber: number): string[] {
    return readFile(`data/day${dayNumber}/test.txt`)
}

export function readTestFileForDay(dayNumber: number): string [] {
    return readFile(`data/day${dayNumber}/example.txt`)
}