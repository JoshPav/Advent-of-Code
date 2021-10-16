package days

import (
	"fmt"
	"regexp"

	"../../shared"
)

// Day19Computer solves day19
type Day19Computer struct{}

var printed = false

func matchesRule0(ruleMap map[int]rule, message string) bool {

	theRule := ruleMap[0]

	regexPattern := regexp.MustCompile("(?m)^" + theRule.getRulePattern() + ")$")

	return regexPattern.MatchString(message) && len(regexPattern.FindAllString(message, -1)[0]) == len(message)
}

// Part1 of day 19
func (d *Day19Computer) Part1(input shared.Input) (shared.Result, error) {

	rules, i := parseRules(input)

	matchingMessages := 0

	for i = i + 1; i < len(input); i++ {
		if matchesRule0(rules, input[i]) {
			matchingMessages++
		}
	}

	return fmt.Sprintf("%v", matchingMessages), nil
}

// Part2 of day 19
func (d *Day19Computer) Part2(input shared.Input) (shared.Result, error) {

	return "", nil
}
