package days

import (
	"errors"
	"strconv"

	"../../shared"
)

const target = 2020

type pair struct {
	a int
	b int
}

func buildMap(lines []int) map[int]pair {
	length := len(lines)

	pairMap := make(map[int]pair)

	for i := 0; i < length; i++ {
		for j := i + 1; j < length; j++ {
			a := lines[i]
			b := lines[j]
			pairMap[a+b] = pair{a, b}
		}
	}
	return pairMap
}

// Day1Computer computes the solutions for day 1
type Day1Computer struct{}

// Part1 day1
func (d *Day1Computer) Part1(input shared.Input) (shared.Result, error) {
	lines := shared.ToIntSlice(input)
	q1Map := make(map[int]bool)

	for _, l := range lines {
		toFind := target - l
		if q1Map[toFind] {
			return strconv.Itoa(toFind * l), nil
		}
		q1Map[l] = true
	}
	return "", errors.New("Could not find matching numbers")
}

// Part2 day1
func (d *Day1Computer) Part2(input shared.Input) (shared.Result, error) {
	lines := shared.ToIntSlice(input)
	q2Map := buildMap(lines)

	for _, l := range lines {
		if intPair, ok := q2Map[target-l]; ok {
			return strconv.Itoa(intPair.a * intPair.b * l), nil
		}
	}
	return "", errors.New("Could not find matching numbers")
}
