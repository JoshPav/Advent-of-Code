package days

import (
	"fmt"
	"math"
	"strconv"

	"../../shared"
)

// Day12Computer solves day12
type Day12Computer struct{}

type coords struct {
	x          int
	y          int
	currentDir int
}

var dirs = map[int]rune{
	0: 'N',
	1: 'E',
	2: 'S',
	3: 'W',
}

// Part1 of day 10
func (d *Day12Computer) Part1(input shared.Input) (shared.Result, error) {

	pos := coords{0, 0, 1}

	for _, v := range input {

		action := rune(v[0])
		value, _ := strconv.Atoi(v[1:])

		applyAction(action, value, &pos)

		fmt.Println(v)
	}

	return getManhattenDistance(pos), nil
}

func getManhattenDistance(pos coords) string {
	return strconv.Itoa(abs(pos.x) + abs(pos.y))
}

func abs(val int) int {
	if val < 0 {
		return val * -1
	}
	return val
}

func rotatePoint(angle float64, origin, waypoint *coords) {
	println("RO")

	rad := angle * math.Pi / 180
	s := int(math.Sin(rad))
	c := int(math.Cos(rad))

	// rotate point
	xnew := waypoint.x*c - waypoint.y*s
	ynew := waypoint.x*s + waypoint.y*c

	// translate point back:
	waypoint.x = xnew
	waypoint.y = ynew
}

func applyActionPt2(action rune, value int, shipPos, waypointPos *coords) {

	switch action {
	case 'N':
		waypointPos.y += value
	case 'S':
		waypointPos.y -= value
	case 'E':
		waypointPos.x += value
	case 'W':
		waypointPos.x -= value
	case 'L':
		rotatePoint(float64(value), shipPos, waypointPos)
	case 'R':
		rotatePoint(float64(value*-1), shipPos, waypointPos)
	case 'F':
		shipPos.x += waypointPos.x * value
		shipPos.y += waypointPos.y * value
	}

}

func applyAction(action rune, value int, pos *coords) {

	switch action {
	case 'N':
		pos.y += value
	case 'S':
		pos.y -= value
	case 'E':
		pos.x += value
	case 'W':
		pos.x -= value
	case 'L':
		pos.currentDir = ((pos.currentDir - value/90) + 4) % 4
	case 'R':
		pos.currentDir = ((pos.currentDir + value/90) + 4) % 4
	case 'F':
		applyAction(dirs[pos.currentDir], value, pos)
	}

}

// Part2 of day 10
func (d *Day12Computer) Part2(input shared.Input) (shared.Result, error) {

	pos := coords{0, 0, 1}
	waypointStart := coords{10, 1, 0}

	for _, v := range input {

		action := rune(v[0])
		value, _ := strconv.Atoi(v[1:])

		applyActionPt2(action, value, &pos, &waypointStart)
		fmt.Println("Ship", pos)
		fmt.Print("way", waypointStart, "\n\n")
	}

	return getManhattenDistance(pos), nil
}
