package days

import (
	"fmt"

	"../../shared"
)

const hashesInSeaMonster = 15

// Day20Computer solves day20
type Day20Computer struct{}

// Part1 of day 20
func (d *Day20Computer) Part1(input shared.Input) (shared.Result, error) {

	tiles := createTilesFromInput(input)

	ans := 1

	cornerTiles, _, _ := splitTiles(tiles)

	for _, id := range cornerTiles {
		ans *= id
	}

	return fmt.Sprintf("%v", ans), nil
}

// Part2 of day 20
func (d *Day20Computer) Part2(input shared.Input) (shared.Result, error) {

	tiles := createTilesFromInput(input)

	asTile := removeBordersFromImage(getFullImageLayout(tiles))

	totalHashes := countHashes(asTile)

	seaMonsters := countSeaMonstersInImage(asTile)

	return fmt.Sprintf("%v", totalHashes-(seaMonsters*hashesInSeaMonster)), nil
}
