package days

import (
	"strconv"

	"../../shared"
)

const floor = '.'
const emptySeat = 'L'
const occupiedSeat = '#'

// Day11Computer solves day11
type Day11Computer struct{}

func getNewSeatState(seatLayout [][]rune, row, col int) rune {

	currentSeat := (seatLayout)[row][col]

	if currentSeat == emptySeat && adjacentSeatsOccupiedCount(seatLayout, row, col) == 0 {
		return occupiedSeat
	} else if currentSeat == occupiedSeat && adjacentSeatsOccupiedCount(seatLayout, row, col) >= 4 {
		return emptySeat
	}
	return currentSeat
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func adjacentSeatsOccupiedCount(seatLayout [][]rune, row, col int) int {

	count := 0

	minRow := max(0, row-1)
	maxRow := min(len(seatLayout)-1, row+1)

	minCol := max(0, col-1)
	maxCol := min(len(seatLayout[row])-1, col+1)

	for rowIt := minRow; rowIt <= maxRow; rowIt++ {
		for colIt := minCol; colIt <= maxCol; colIt++ {
			if rowIt != row || colIt != col {
				if seatLayout[rowIt][colIt] == occupiedSeat {
					count++
				}
			}
		}
	}

	return count
}

type direction struct {
	x int
	y int
}

func getAllDirections() []direction {
	return []direction{
		direction{0, -1},  // North
		direction{1, -1},  // North east
		direction{1, 0},   // east
		direction{1, 1},   // south east
		direction{0, 1},   // south
		direction{-1, 1},  // south west
		direction{-1, 0},  // west
		direction{-1, -1}, // north west
	}
}

func outOfBounds(seatMap [][]rune, row, col int) bool {
	return row < 0 || row >= len(seatMap) || col < 0 || col >= len(seatMap[0])
}

func getFirstSeatInEachDirection(seatLayout [][]rune, row, col int) []rune {

	seats := make([]rune, 0)

	for _, dir := range getAllDirections() {
		currentRow := row
		currentCol := col

	seatLoop:
		for {
			currentRow += dir.y
			currentCol += dir.x

			if outOfBounds(seatLayout, currentRow, currentCol) {
				break seatLoop
			} else if seat := seatLayout[currentRow][currentCol]; seat != floor {
				seats = append(seats, seat)
				break seatLoop
			}

		}
	}
	return seats
}

func createSeatLayout(input shared.Input) [][]rune {

	seatLayout := make([][]rune, len(input))

	for row, line := range input {
		seatLayout[row] = make([]rune, len(line))
		for col, char := range line {
			seatLayout[row][col] = char
		}
	}

	return seatLayout
}

func getUpdatedLayout(seatLayout [][]rune) [][]rune {

	newSeatLayout := make([][]rune, len(seatLayout))

	for rowIt, row := range seatLayout {
		newSeatLayout[rowIt] = make([]rune, len(row))
		for colIt := range row {
			newSeat := getNewSeatState(seatLayout, rowIt, colIt)
			newSeatLayout[rowIt][colIt] = newSeat
		}
	}

	return newSeatLayout

}

func sliceEqual(a, b []rune) bool {
	if len(a) != len(b) {
		return false
	}
	for i, v := range a {
		if v != b[i] {
			return false
		}
	}
	return true
}

func seatLayoutsEqual(a, b [][]rune) bool {
	if len(a) != len(b) {
		return false
	}
	for i, v := range a {
		if !sliceEqual(v, b[i]) {
			return false
		}
	}
	return true
}

func getOccupiedCount(seatLayout [][]rune) int {
	count := 0
	for _, row := range seatLayout {
		for _, seat := range row {
			if seat == occupiedSeat {
				count++
			}
		}
	}
	return count
}

// Part1 of day 10
func (d *Day11Computer) Part1(input shared.Input) (shared.Result, error) {

	seatLayout := createSeatLayout(input)

	for {
		newSeatLayout := getUpdatedLayout(seatLayout)

		if seatLayoutsEqual(seatLayout, newSeatLayout) {
			break
		}

		// Reset
		seatLayout = newSeatLayout
	}

	return strconv.Itoa(getOccupiedCount(seatLayout)), nil
}

func getUpdatedLayoutPt2(seatLayout [][]rune) [][]rune {

	newSeatLayout := make([][]rune, len(seatLayout))

	for rowIt, row := range seatLayout {
		newSeatLayout[rowIt] = make([]rune, len(row))
		for colIt := range row {
			newSeat := getNewSeatStatePt2(seatLayout, rowIt, colIt)
			newSeatLayout[rowIt][colIt] = newSeat
		}
	}

	return newSeatLayout

}

func getNewSeatStatePt2(seatLayout [][]rune, row, col int) rune {

	currentSeat := (seatLayout)[row][col]

	firstSeatsInDirections := getFirstSeatInEachDirection(seatLayout, row, col)

	occupiedCount := 0

	for _, seat := range firstSeatsInDirections {
		if seat == occupiedSeat {
			occupiedCount++
		}
	}

	if currentSeat == emptySeat && occupiedCount == 0 {
		return occupiedSeat
	} else if currentSeat == occupiedSeat && occupiedCount >= 5 {
		return emptySeat
	}
	return currentSeat
}

// Part2 of day 10
func (d *Day11Computer) Part2(input shared.Input) (shared.Result, error) {

	seatLayout := createSeatLayout(input)

	for {
		newSeatLayout := getUpdatedLayoutPt2(seatLayout)

		if seatLayoutsEqual(seatLayout, newSeatLayout) {
			break
		}

		// Reset
		seatLayout = newSeatLayout
	}

	return strconv.Itoa(getOccupiedCount(seatLayout)), nil
}
