package days

import (
	"strconv"

	"../../shared"
)

// Day17Computer solves day17
type Day17Computer struct{}

// Part1 of day 17
func (d *Day17Computer) Part1(input shared.Input) (shared.Result, error) {

	pocketDimension := createPocketDimensionFromInitialState(input)

	pocketDimension.ProcessNCycles(6)

	activeCount := pocketDimension.GetActiveCount()

	return strconv.Itoa(activeCount), nil
}

func createPocketDimensionFromInitialState(initialState shared.Input) PocketDimension {

	z := 0
	w := 0

	dimension := NewPocketDimension(len(initialState[0]), len(initialState), 1, 1)

	for y, line := range initialState {
		for x, state := range line {
			dimension.Set(Coordinate{x, y, z, w}, state)
		}
	}

	return dimension
}

// Part2 of day 17
func (d *Day17Computer) Part2(input shared.Input) (shared.Result, error) {

	return "", nil
}
