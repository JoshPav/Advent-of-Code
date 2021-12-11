import { Day } from '../../shared/day';

export default {
    solvePartOne: (input: string[]): string | number => {
        return input.map(num => parseInt(num)).reduce((a, b) => a + b)
    },
    solvePartTwo: (input: string[]): string | number => {
        const seen: { [key: number]: boolean } = {}
        let sum = 0
        const nums = input.map(num => parseInt(num))

        let seenTwice = undefined
        let i = 0

        while(!seenTwice) {
            sum += nums[i % nums.length]
            if (seen[sum]) seenTwice = sum
            else seen[sum] = true
            i++
        }

        return seenTwice
    }
} as Day