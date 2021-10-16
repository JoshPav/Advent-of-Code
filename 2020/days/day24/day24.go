package days

import (
	"fmt"
	"math"

	"../../shared"
)

// Day24Computer solves day24
type Day24Computer struct{}

var startPos = coord{0, 0}

type coord struct {
	x int
	y int
}

func getDirections(line string) []string {

	directions := make([]string, 0)

	for i := 0; i < len(line); i++ {

		direction := string(line[i])

		if direction == "s" || direction == "n" {
			direction = line[i : i+2]
			i++
		}
		directions = append(directions, direction)

	}

	return directions
}

func getCoordsFromDirections(directions []string) coord {

	tilePos := startPos

	for _, direction := range directions {

		switch direction {
		case "ne":
			tilePos.x++
			tilePos.y++
		case "nw":
			tilePos.x--
			tilePos.y++
		case "se":
			tilePos.x++
			tilePos.y--
		case "sw":
			tilePos.x--
			tilePos.y--
		case "w":
			tilePos.x -= 2
		case "e":
			tilePos.x += 2
		}

	}

	return tilePos

}

func identifyTile(tilePos coord, floorMap *map[coord]bool) {

	if tileFlipped, tileSet := (*floorMap)[tilePos]; tileSet {
		(*floorMap)[tilePos] = !tileFlipped
	} else {
		(*floorMap)[tilePos] = true
	}
}

func createFloorMap(input shared.Input) (map[coord]bool, map[coord]struct{}) {
	floorMap := make(map[coord]bool)

	allAdjacentTiles := make(map[coord]struct{})

	for _, line := range input {
		tilePos := getCoordsFromDirections(getDirections(line))

		identifyTile(tilePos, &floorMap)

		for _, adjacent := range getAdjacentTiles(tilePos) {
			allAdjacentTiles[adjacent] = struct{}{}
		}
	}

	return floorMap, allAdjacentTiles
}

func getBlackTiles(floorMap map[coord]bool) int {
	count := 0

	for _, v := range floorMap {
		if v {
			count++
		}
	}

	return count
}

func getAdjacentTiles(tile coord) []coord {

	adjacentTiles := make([]coord, 0)

	for x := -2; x <= 2; x++ {
		for y := -1; y <= 1; y++ {

			if !(x == 0 && y == 0) && (int(math.Abs(float64(x+y)))%2 == 0) {

				adjacentTiles = append(adjacentTiles, coord{tile.x + x, tile.y + y})
			}
		}
	}

	return adjacentTiles
}

func getAdjacentTileColours(adjacentTiles []coord, tileMap map[coord]bool) (int, int) {

	blackTiles := 0
	whiteTiles := 0

	for _, adjacentTile := range adjacentTiles {

		if tileFlipped, tileSet := tileMap[adjacentTile]; tileSet {

			if tileFlipped {
				blackTiles++
			} else {
				whiteTiles++
			}

		}

	}
	return blackTiles, whiteTiles
}

func processDay(floorMap map[coord]bool, allToCheck map[coord]struct{}) (map[coord]bool, map[coord]struct{}) {

	endOfDayFloorMap := make(map[coord]bool)
	allAdjacentTiles := allToCheck

	for tile := range allToCheck {

		adjacentTiles := getAdjacentTiles(tile)

		adjacentBlack, _ := getAdjacentTileColours(adjacentTiles, floorMap)

		tileFlipped, tileSet := floorMap[tile]

		if tileSet && tileFlipped {
			// Flipped means black
			endOfDayFloorMap[tile] = !(adjacentBlack == 0 || adjacentBlack > 2)
		} else {
			shouldFlip := (adjacentBlack == 2)
			if shouldFlip {
				for _, adjacent := range getAdjacentTiles(tile) {
					allAdjacentTiles[adjacent] = struct{}{}
				}
			}
			endOfDayFloorMap[tile] = shouldFlip
		}

	}

	return endOfDayFloorMap, allAdjacentTiles
}

// Part1 of day 24
func (d *Day24Computer) Part1(input shared.Input) (shared.Result, error) {

	floorMap, _ := createFloorMap(input)

	return fmt.Sprintf("%v", getBlackTiles(floorMap)), nil
}

// Part2 of day 24
func (d *Day24Computer) Part2(input shared.Input) (shared.Result, error) {

	floorMap, allToCheck := createFloorMap(input)

	days := 100

	for i := 1; i <= days; i++ {
		floorMap, allToCheck = processDay(floorMap, allToCheck)
	}

	return fmt.Sprintf("%v", getBlackTiles(floorMap)), nil
}
