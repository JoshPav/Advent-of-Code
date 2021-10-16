package days

import (
	"strconv"
	"strings"

	"../../shared"
)

// Day2Computer computes the solutions for day 2
type Day2Computer struct{}

// PasswordPolicy policy stores the information used to validate a password
type PasswordPolicy struct {
	min    int
	max    int
	letter string
}

func getPolicy(line string) (PasswordPolicy, string) {
	split := strings.Split(line, ":")
	lhs := strings.Split(split[0], " ")
	minMax := strings.Split(lhs[0], "-")

	min, _ := strconv.Atoi(minMax[0])
	max, _ := strconv.Atoi(minMax[1])

	pw := PasswordPolicy{min, max, lhs[1]}

	return pw, strings.TrimSpace(split[1])
}

type validator func(policy PasswordPolicy, pw string) bool

func validatePassword1(policy PasswordPolicy, pw string) bool {
	occurrences := strings.Count(pw, policy.letter)
	return occurrences >= policy.min && occurrences <= policy.max
}

func validatePasswordPt2(policy PasswordPolicy, pw string) bool {
	minIndexMatches := string(pw[policy.min-1]) == policy.letter
	maxIndexMatches := string(pw[policy.max-1]) == policy.letter
	return minIndexMatches != maxIndexMatches
}

func validate(toValidate shared.Input, fn validator) string {
	validPasswords := 0

	for _, line := range toValidate {

		if fn(getPolicy(line)) {
			validPasswords++
		}
	}
	return strconv.Itoa(validPasswords)
}

// Part1 day2
func (d *Day2Computer) Part1(input shared.Input) (shared.Result, error) {
	return validate(input, validatePassword1), nil
}

// Part2 day2
func (d *Day2Computer) Part2(input shared.Input) (shared.Result, error) {
	return validate(input, validatePasswordPt2), nil
}
