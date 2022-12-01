import { Day } from '../shared/day';

function measurementCount(input: string[]) : string {
    let increaseCount = 0;

        for (let i = 1; i < input.length; i++)
        {
            let j = i -1;
            if (parseInt(input[i]) > parseInt(input[j]))
            {
                increaseCount ++;
            }
        }

        return String(increaseCount)
}

export default {
    solvePartOne: (input: string[]): string => {
        return measurementCount(input)
    },
    solvePartTwo: (input: string[]): string => {
        let newArray = []
        for(let i = 0; i< input.length-2;i++)
        {
            newArray.push(parseInt(input[i])+parseInt(input[i+1])+parseInt(input[i+2]))
        }
        newArray.push(parseInt(input[input.length-2]) + parseInt(input[input.length-1]))
        newArray.push(parseInt(input[input.length-1]))
        return measurementCount(newArray);
    }
} as Day
