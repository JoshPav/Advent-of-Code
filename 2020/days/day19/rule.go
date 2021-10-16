package days

import (
	"fmt"
	"strconv"
	"strings"

	"../../shared"
)

type rule struct {
	subRules       [][]int
	letter         string
	ruleMap        *map[int]rule
	cachedPatterns *map[int]string
	ruleNumber     int
}

func (r *rule) getRulePattern() string {

	if r.subRules == nil {
		return r.letter
	} else if r.ruleNumber == 8 {

		var rulePattern string
		var ok bool

		if rulePattern, ok = (*r.cachedPatterns)[42]; !ok {
			rule42 := (*r.ruleMap)[42]
			rulePattern = rule42.getRulePattern()
			(*r.cachedPatterns)[42] = rulePattern
		}

		return (*r.cachedPatterns)[42] + "+" + "(?:"

	} else if r.ruleNumber == 11 {

		var rule42Pattern string
		var ok42 bool

		var rule31Pattern string
		var ok31 bool

		if rule42Pattern, ok42 = (*r.cachedPatterns)[42]; !ok42 {
			rule42 := (*r.ruleMap)[42]
			rule42Pattern = rule42.getRulePattern()
			(*r.cachedPatterns)[42] = rule42Pattern
		}

		if rule31Pattern, ok31 = (*r.cachedPatterns)[31]; !ok31 {
			rule31 := (*r.ruleMap)[31]
			rule31Pattern = rule31.getRulePattern()
			(*r.cachedPatterns)[31] = rule31Pattern
		}

		toReturn := ""
		max := 10
		for i := 1; i <= max; i++ {
			toReturn = toReturn + fmt.Sprintf("%s{%v}%s{%v}", rule42Pattern, i, rule31Pattern, i)
			if i != max {
				toReturn = toReturn + "|"
			}

		}
		return toReturn
	} else {

		toReturn := ""

		for i, subRule := range r.subRules {

			for _, ruleNumber := range subRule {
				theRule := (*r.ruleMap)[ruleNumber]

				var rulePattern string
				var ok bool

				if rulePattern, ok = (*r.cachedPatterns)[ruleNumber]; !ok {
					rulePattern = theRule.getRulePattern()
					(*r.cachedPatterns)[ruleNumber] = rulePattern
				}

				toReturn = toReturn + rulePattern
			}

			if i != len(r.subRules)-1 {
				toReturn = toReturn + "|"
			}
		}
		return "(?:" + toReturn + ")"

	}
}

func parseRules(input shared.Input) (map[int]rule, int) {

	rules := make(map[int]rule, 0)
	cachedPatterns := make(map[int]string)

	for i, line := range input {

		if line == "" {
			return rules, i
		}

		splitOne := strings.Split(line, ":")

		ruleNumber, _ := strconv.Atoi(splitOne[0])

		if strings.Contains(splitOne[1], "\"") {

			letter := strings.Replace(splitOne[1], "\"", "", 2)

			rules[ruleNumber] = rule{subRules: nil, letter: strings.TrimSpace(letter), ruleMap: &rules, cachedPatterns: &cachedPatterns, ruleNumber: ruleNumber}

		} else {
			subRuleString := strings.Split(splitOne[1], "|")

			subRules := make([][]int, 0)

			for _, ruleSet := range subRuleString {

				subRuleNumbers := make([]int, 0)

				for _, subRuleNumber := range strings.Split(strings.TrimSpace(ruleSet), " ") {
					asNum, _ := strconv.Atoi(subRuleNumber)
					subRuleNumbers = append(subRuleNumbers, asNum)
				}

				subRules = append(subRules, subRuleNumbers)
			}

			rules[ruleNumber] = rule{subRules: subRules, letter: "", ruleMap: &rules, cachedPatterns: &cachedPatterns, ruleNumber: ruleNumber}

		}

	}
	return nil, 1
}

func containsValue(value int, toCheck []int) bool {

	for _, val := range toCheck {
		if val == value {
			return true
		}
	}
	return false
}
