package days

import (
	"strconv"
	"strings"

	"../../shared"
)

// Day15Computer solves day15
type Day15Computer struct{}

func buildNumbersSpoken(startNumbers []int) (map[int]int, int) {

	numbersSpoken := make(map[int]int, 0)
	lastSpoken := -1

	for turn, num := range startNumbers {
		if lastSpoken != -1 {
			numbersSpoken[lastSpoken] = turn + 1
		}
		lastSpoken = num
		// fmt.Println("Turn:", turn+1, "-", lastSpoken)
	}

	return numbersSpoken, lastSpoken
}

func getNumberSpokenOnTurn(startNumbers []int, targetTurn int) int {

	numbersSpoken, lastSpoken := buildNumbersSpoken(startNumbers)

	for turn := len(startNumbers) + 1; ; turn++ {

		if turnLastSaid, ok := numbersSpoken[lastSpoken]; ok {
			toAnnounce := turn - turnLastSaid
			numbersSpoken[lastSpoken] = turn

			lastSpoken = toAnnounce
		} else {
			numbersSpoken[lastSpoken] = turn
			lastSpoken = 0
		}

		// fmt.Println("Turn:", turn, "-", lastSpoken)

		if turn == targetTurn {
			return lastSpoken
		}

	}

}

// Part1 of day 10
func (d *Day15Computer) Part1(input shared.Input) (shared.Result, error) {

	ans := getNumberSpokenOnTurn(shared.ToIntSlice(strings.Split(input[0], ",")), 2020)

	return strconv.Itoa(ans), nil
}

// Part2 of day 10
func (d *Day15Computer) Part2(input shared.Input) (shared.Result, error) {

	ans := getNumberSpokenOnTurn(shared.ToIntSlice(strings.Split(input[0], ",")), 30000000)

	return strconv.Itoa(ans), nil
}
