package days

import (
	"strconv"

	"../../shared"
)

// Day0Computer computes the solutions for day 0
type Day0Computer struct{}

// Part1 day0
func (d *Day0Computer) Part1(input shared.Input) (shared.Result, error) {

	lines := shared.ToIntSlice(input)
	totalFuelPartOne := 0

	for _, s := range lines {
		totalFuelPartOne += fuelRequired(s)
	}
	return strconv.Itoa(totalFuelPartOne), nil
}

// Part2 day0
func (d *Day0Computer) Part2(input shared.Input) (shared.Result, error) {

	lines := shared.ToIntSlice(input)
	totalFuelPartTwo := 0

	for _, s := range lines {
		totalFuelPartTwo += fuelRequiredPartTwo(s)
	}
	return strconv.Itoa(totalFuelPartTwo), nil
}

func fuelRequired(mass int) int {
	// Go does floor division for ints
	return mass/3 - 2
}

func fuelRequiredPartTwo(mass int) int {
	fuelRequired := fuelRequired(mass)
	if fuelRequired > 0 {
		return fuelRequired + fuelRequiredPartTwo(fuelRequired)
	}
	return 0
}
