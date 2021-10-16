package days

import (
	"sort"
	"strconv"

	"../../shared"
)

// Day10Computer solves day10
type Day10Computer struct{}

const minAdapterDiff = 1
const maxAdapterDiff = 3

func createJoltageAdapterSlice(puzzleInput shared.Input) []int {

	joltages := shared.ToIntSlice(puzzleInput)

	sort.Ints(joltages)

	joltages = append([]int{0}, joltages...) // Add charging outlet joltage

	maxDeviceJoltage := joltages[len(joltages)-1]
	joltages = append(joltages, maxDeviceJoltage+maxAdapterDiff) // Add my devices joltage

	return joltages
}

// Part1 of day 10
func (d *Day10Computer) Part1(input shared.Input) (shared.Result, error) {

	joltages := createJoltageAdapterSlice(input)

	joltageDifferences := []int{0, 0, 0}

	for i := 0; i < len(joltages)-1; i++ {
		diff := joltages[i+1] - joltages[i]
		joltageDifferences[diff-1]++
	}

	return strconv.Itoa(joltageDifferences[0] * joltageDifferences[2]), nil
}

// Part2 of day 10
func (d *Day10Computer) Part2(input shared.Input) (shared.Result, error) {

	joltages := createJoltageAdapterSlice(input)

	joltagePathCombinations := make([]int, len(joltages))
	joltagePathCombinations[0]++

	for i := 1; i < len(joltages); i++ {
		for index := i - 1; index >= 0; index-- {
			diff := joltages[i] - joltages[index]
			if diff > maxAdapterDiff {
				break
			} else if minAdapterDiff <= diff && diff <= maxAdapterDiff {
				joltagePathCombinations[i] += joltagePathCombinations[index]
			}
		}

	}

	return strconv.Itoa(joltagePathCombinations[len(joltagePathCombinations)-1]), nil
}
