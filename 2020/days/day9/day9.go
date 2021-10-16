package days

import (
	"errors"
	"sort"
	"strconv"

	"../../shared"
)

// Day9Computer solves day9
type Day9Computer struct{}

func getAllPreviousNumberSums(previousNumbers []int) map[int]struct{} {
	numberCombinations := make(map[int]struct{})
	for i := 0; i < len(previousNumbers); i++ {
		for j := i; j < len(previousNumbers); j++ {
			if i != j {
				numberCombinations[previousNumbers[i]+previousNumbers[j]] = struct{}{}
			}
		}
	}
	return numberCombinations
}

func isNumberSumOfPreviousNumbers(num int, previousNumbers []int) bool {
	_, ok := getAllPreviousNumberSums(previousNumbers)[num]
	return ok
}

func findContiguousSequenceForNumber(toSumTo int, numbers []int) []int {
	for i := 0; i < len(numbers); i++ {
		cumulativeTotal := 0
		contiguousSequence := make([]int, 0)
		for j := i; j < len(numbers); j++ {
			cumulativeTotal += numbers[j]
			contiguousSequence = append(contiguousSequence, numbers[j])

			if cumulativeTotal == toSumTo {
				return contiguousSequence
			} else if cumulativeTotal > toSumTo {
				continue
			}
		}
	}
	return nil
}

func findNumberThatIsNotSumOfPrevious(numbers []int, preambleLength int) (int, error) {

	for i := preambleLength; i < len(numbers); i++ {
		previousNumbers := numbers[i-preambleLength : i]
		if !isNumberSumOfPreviousNumbers(numbers[i], previousNumbers) {
			return numbers[i], nil
		}
	}

	return -1, errors.New("Could not find number")

}

func getMinPlusMax(numbers []int) int {
	sort.Ints(numbers)
	return numbers[0] + numbers[len(numbers)-1]
}

// Part1 of day 9
func (d *Day9Computer) Part1(input shared.Input) (shared.Result, error) {
	res, err := findNumberThatIsNotSumOfPrevious(shared.ToIntSlice(input), 25)
	return strconv.Itoa(res), err
}

// Part2 of day 9
func (d *Day9Computer) Part2(input shared.Input) (shared.Result, error) {
	sequence := findContiguousSequenceForNumber(375054920, shared.ToIntSlice(input))
	return strconv.Itoa(getMinPlusMax(sequence)), nil
}
