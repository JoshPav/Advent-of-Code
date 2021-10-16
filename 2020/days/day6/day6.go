package days

import (
	"strconv"

	"../../shared"
)

// Day6Computer solves day6
type Day6Computer struct{}

type set map[rune]struct{}

func (s *set) isEmpty() bool {
	return s == nil || len(*s) == 0
}

func (s *set) getIntersect(other set) set {
	intersect := make(set)
	for k := range *s {
		if _, ok := other[k]; ok {
			intersect[k] = struct{}{}
		}
	}
	return intersect
}

func (s *set) uniqueAnswersCount() int {
	return len(*s)
}

func addAnswersToSet(s *set, answerLine string) {
	for _, char := range answerLine {
		(*s)[char] = struct{}{}
	}
}

// Part1 of day 6
func (d *Day6Computer) Part1(input shared.Input) (shared.Result, error) {

	answers := make(set)

	uniqueAnswers := 0

	for i, line := range input {

		if len(line) > 0 {
			addAnswersToSet(&answers, line)
		}

		if len(line) == 0 || i == len(input)-1 {
			uniqueAnswers += answers.uniqueAnswersCount()
			answers = make(set)
		}
	}
	return strconv.Itoa(uniqueAnswers), nil
}

// Part2 of day 6
func (d *Day6Computer) Part2(input shared.Input) (shared.Result, error) {

	answers := make(set)

	uniqueAnswers := 0

	populatedSet := false

	for i, line := range input {

		if len(line) > 0 {

			if populatedSet && answers.isEmpty() {
				// If there are no intersections on previous questions then there is no need to check any more
				continue
			}

			newAnswers := make(set)
			addAnswersToSet(&newAnswers, line)

			if !populatedSet {
				answers = newAnswers
				populatedSet = true
			} else {
				answers = answers.getIntersect(newAnswers)
			}
		}

		if len(line) == 0 || i == len(input)-1 {
			uniqueAnswers += answers.uniqueAnswersCount()
			answers = make(set)
			populatedSet = false
		}
	}
	return strconv.Itoa(uniqueAnswers), nil
}
