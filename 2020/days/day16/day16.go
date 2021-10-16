package days

import (
	"fmt"
	"strconv"
	"strings"

	"../../shared"
)

// Day16Computer solves day16
type Day16Computer struct{}

type rule struct {
	fieldName string
	rules     []ruleRange
}

type ruleRange struct {
	min int
	max int
}

type ticket struct {
	fields []int
}

func stripSpaces(line string) string {
	return strings.ReplaceAll(line, " ", "")
}

func createRuleRange(ruleString string) ruleRange {

	minMax := strings.Split(ruleString, "-")

	min, _ := strconv.Atoi(minMax[0])
	max, _ := strconv.Atoi(minMax[1])

	return ruleRange{min, max}
}

func createRulesFromInput(input shared.Input) ([]rule, int) {

	rules := make([]rule, 0)

	for lineNumber, line := range input {

		if line == "" {
			return rules, lineNumber
		}

		rules = append(rules, createRuleFromLine(line))

	}

	return rules, len(input) - 1

}

func createRuleFromLine(line string) rule {

	parsedRules := make([]ruleRange, 0)

	nameAndRules := strings.Split(line, ":")

	rules := strings.Split(stripSpaces(nameAndRules[1]), "or")

	for _, r := range rules {
		parsedRules = append(parsedRules, createRuleRange(r))
	}

	newRule := rule{fieldName: nameAndRules[0], rules: parsedRules}

	return newRule
}

func (rr *ruleRange) withinRange(num int) bool {
	return rr.min <= num && num <= rr.max
}

func (r *rule) fitsField(ticket int) bool {
	isValid := false
	for _, ruleRange := range r.rules {
		if ruleRange.withinRange(ticket) {
			isValid = true
			break
		}
	}

	return isValid
}

func getNearbyTickets(input shared.Input, startIndex int) []ticket {

	nearbyTickets := make([]ticket, 0)

	for i := startIndex; i < len(input); i++ {

		nearbyTickets = append(nearbyTickets, ticket{shared.ToIntSlice(strings.Split(input[i], ","))})

	}
	return nearbyTickets
}

func getInvalidFields(rules []rule, tickets []ticket) []int {
	invalidFields := make([]int, 0)

	for _, ticket := range tickets {
		for _, field := range ticket.fields {
			fieldValid := false
			for _, rule := range rules {
				if rule.fitsField(field) {
					fieldValid = true
					break
				}
			}
			if !fieldValid {
				invalidFields = append(invalidFields, field)
			}

		}
	}
	return invalidFields
}

func withValueRemoved(values []int, toRemove int) []int {

	result := make([]int, 0)

	for _, value := range values {
		if value != toRemove {
			result = append(result, value)
		}
	}

	return result
}

func getAllValidPositions(validTickets []ticket, rules []rule) map[string][]int {
	potentialPositions := make(map[string][]int)

	for _, rule := range rules {
		potentialPositions[rule.fieldName] = make([]int, 0)
	}

	first := true

	for _, ticket := range validTickets {

		for _, rule := range rules {

			for i, field := range ticket.fields {

				if rule.fitsField(field) {

					if first {
						potentialPositions[rule.fieldName] = append(potentialPositions[rule.fieldName], i)
					}

				} else {
					potentialPositions[rule.fieldName] = withValueRemoved(potentialPositions[rule.fieldName], i)
				}

			}

		}
		first = false
	}

	return potentialPositions
}

func determineFieldsFromPosition(validTickets []ticket, rules []rule) map[string]int {

	potentialPositions := getAllValidPositions(validTickets, rules)

	fieldPositions := make(map[string]int, 0)

	alreadySetFields := make([]int, 0)

	for len(potentialPositions) > 0 {

		for k, v := range potentialPositions {

			if len(v) == 1 {
				fieldPositions[k] = v[0]
				alreadySetFields = append(alreadySetFields, v[0])
				delete(potentialPositions, k)
			}
		}

		for k, v := range potentialPositions {

			for _, alreadySetField := range alreadySetFields {
				potentialPositions[k] = withValueRemoved(v, alreadySetField)
			}
		}

	}

	return fieldPositions

}

func getValidTickets(rules []rule, tickets []ticket) []ticket {

	validTickets := make([]ticket, 0)

	for _, ticket := range tickets {
		ticketValid := true

		for _, field := range ticket.fields {
			fieldValid := false

			for _, rule := range rules {
				if rule.fitsField(field) {
					fieldValid = true
					break
				}
			}
			if !fieldValid {
				ticketValid = false
				break
			}

		}

		if ticketValid {
			validTickets = append(validTickets, ticket)
		}
	}
	return validTickets
}

func getErrorRate(invalidTickets []int) int {

	total := 0

	for _, ticket := range invalidTickets {
		total += ticket
	}

	return total
}

// Part1 of day 10
func (d *Day16Computer) Part1(input shared.Input) (shared.Result, error) {

	rules, lineNumber := createRulesFromInput(input)
	nearbyTicketsIndex := lineNumber + 5

	nearbyTickets := getNearbyTickets(input, nearbyTicketsIndex)

	invalidFields := getInvalidFields(rules, nearbyTickets)

	return strconv.Itoa(getErrorRate(invalidFields)), nil
}

// Part2 of day 10
func (d *Day16Computer) Part2(input shared.Input) (shared.Result, error) {

	rules, lineNumber := createRulesFromInput(input)

	myTicketIndex := lineNumber + 2
	myTicket := ticket{shared.ToIntSlice(strings.Split(input[myTicketIndex], ","))}

	nearbyTicketsIndex := lineNumber + 5

	nearbyTickets := getNearbyTickets(input, nearbyTicketsIndex)

	validTickets := getValidTickets(rules, nearbyTickets)

	fieldsAndPositions := determineFieldsFromPosition(validTickets, rules)

	result := 1

	for field, index := range fieldsAndPositions {
		if strings.Contains(field, "departure") {
			result *= myTicket.fields[index]
		}
	}

	fmt.Println(myTicket)

	return strconv.Itoa(result), nil
}
