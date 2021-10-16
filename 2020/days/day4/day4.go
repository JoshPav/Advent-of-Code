package days

import (
	"strconv"
	"strings"

	"../../shared"
)

// Day4Computer solves day4
type Day4Computer struct{}

var passportFields = map[string]string{
	"byr": "BirthYear",
	"iyr": "IssueYear",
	"eyr": "ExpirationYear",
	"hgt": "Height",
	"hcl": "HairColour",
	"ecl": "EyeColour",
	"pid": "PassportID",
	"cid": "CountryID",
}

func loadAllPassports(input []string) []Passport {
	var allPassport []Passport

	currentPassport := Passport{}

	for _, l := range input {

		if strings.TrimSpace(l) == "" {
			allPassport = append(allPassport, currentPassport)
			currentPassport = Passport{}
			continue
		}

		fields := strings.Split(l, " ")

		for _, field := range fields {
			keyValue := strings.Split(field, ":")
			shared.SetField(&currentPassport, passportFields[keyValue[0]], keyValue[1])
		}

	}
	allPassport = append(allPassport, currentPassport)

	return allPassport
}

// Part1 of day 4
func (d *Day4Computer) Part1(input shared.Input) (shared.Result, error) {

	validPassports := 0

	for _, passport := range loadAllPassports(input) {

		if passport.HasRequiredFields() {
			validPassports++
		}
	}

	return strconv.Itoa(validPassports), nil
}

// Part2 of day 4
func (d *Day4Computer) Part2(input shared.Input) (shared.Result, error) {
	validPassports := 0

	for _, passport := range loadAllPassports(input) {

		if passport.IsValid() {
			validPassports++
		}
	}

	return strconv.Itoa(validPassports), nil
}
