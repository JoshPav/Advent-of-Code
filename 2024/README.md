# 2024 Advent of Code

## Generating files for the next day

Create a `.cookie` file with your `session` cookie from https://adventofcode.com/

Run the script `./generate-day.sh`

This script will: 
- Create a new file to solve the solution (`src/solutions/dayXX.ts`)
- Create a new file to add test cases for the solution (`src/solutions/dayXX.spec.ts`)
- Download your puzzle input and save it (`src/data/dayXX.txt`)


## Running the code

Use `npm run solve` to execute the code
