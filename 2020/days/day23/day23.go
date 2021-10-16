package days

import (
	"strconv"

	"../../shared"
)

// Day23Computer solves day23
type Day23Computer struct{}

// Part1 of day 23
func (d *Day23Computer) Part1(input shared.Input) (shared.Result, error) {

	crabCups := createCrapCupsGameFromInput(input)

	crabCups.PlayNMoves(100)

	return crabCups.GetLabelsAfterCup(1), nil
}

// Part2 of day 23
func (d *Day23Computer) Part2(input shared.Input) (shared.Result, error) {

	crabCups := createCrapCupsGamePt2FromInput(input)

	crabCups.PlayNMoves(10000000)

	cups := crabCups.GetCupsHidingStars()

	result := cups[0] * cups[1]

	return strconv.Itoa(result), nil
}
