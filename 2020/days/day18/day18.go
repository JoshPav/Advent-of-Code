package days

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"../../shared"
)

const bracketRegex = `\([0-9+* ]*\)`
const additionRegex = `[0-9]+ \+ [0-9]+`

// Day18Computer solves day18
type Day18Computer struct{}

type equationSolution struct {
	equation string
	result   int
}

func (es *equationSolution) getEquationRegex() string {
	return "( |^)" + strings.ReplaceAll(
		strings.ReplaceAll(
			strings.ReplaceAll(
				strings.ReplaceAll(es.equation, ")", "\\)"), "*", "\\*"), "(", "\\("), "+", "\\+") + "( |$)"
}

func (es *equationSolution) replaceAdditionInstances(equation *string) {
	regex := regexp.MustCompile(es.getEquationRegex())
	*equation = strings.TrimSpace(regex.ReplaceAllString(*equation, " "+strconv.Itoa(es.result)+" "))
}

func (es *equationSolution) replaceStringInstances(equation *string) {
	*equation = strings.ReplaceAll(*equation, es.equation, strconv.Itoa(es.result))
}

func solveNonNestedBrackets(nonNestedBrackets []string) []equationSolution {

	solutions := make([]equationSolution, 0)

	for _, bracket := range nonNestedBrackets {
		solutions = append(solutions, solveBracket(bracket))
	}
	return solutions
}

func solveNonNestedBracketsPt2(nonNestedBrackets []string) []equationSolution {

	solutions := make([]equationSolution, 0)

	for _, bracket := range nonNestedBrackets {
		solutions = append(solutions, solveBracketPt2(bracket))
	}
	return solutions
}

func withBracketsRemoved(equation string) string {
	return strings.Replace(strings.Replace(equation, "(", "", 1), ")", "", 1)
}

func solveBracket(bracket string) equationSolution {
	return equationSolution{bracket, solveNonBracketEquation(withBracketsRemoved(bracket))}
}

func solveBracketPt2(bracket string) equationSolution {
	return equationSolution{bracket, solveNonBracketEquationPt2(withBracketsRemoved(bracket))}
}

func solveNonBracketEquation(equationString string) int {
	equation := strings.Split(equationString, " ")

	result, _ := strconv.Atoi(equation[0])

	for i := 1; i < len(equation); i += 2 {

		operator := equation[i]
		number, _ := strconv.Atoi(equation[i+1])

		switch operator {
		case "+":
			result += number
		case "*":
			result *= number
		}
	}

	return result
}

func solveNonBracketEquationPt2(equationString string) int {

	regex := regexp.MustCompile(additionRegex)

	for regex.MatchString(equationString) {
		additionEquations := regexp.MustCompile(additionRegex).FindAllString(equationString, -1)

		for _, additionEquation := range additionEquations {

			solvedAddition := solveAdditionEquation(additionEquation)
			solvedAddition.replaceAdditionInstances(&equationString)
		}
	}

	equation := strings.Split(equationString, " ")

	result, _ := strconv.Atoi(equation[0])

	for i := 2; i < len(equation); i += 2 {

		number, _ := strconv.Atoi(equation[i])

		result *= number
	}

	return result
}

func solveAdditionEquation(equationString string) equationSolution {

	equation := strings.Split(equationString, " ")

	result, _ := strconv.Atoi(equation[0])

	for i := 2; i < len(equation); i += 2 {

		number, _ := strconv.Atoi(equation[i])

		result += number
	}

	return equationSolution{equationString, result}

}

func solveEquation(equation string) int {

	regex := regexp.MustCompile(bracketRegex)

	for regex.MatchString(equation) {

		nonNestedBrackets := regexp.MustCompile(bracketRegex).FindAllString(equation, -1)

		solvedBrackets := solveNonNestedBrackets(nonNestedBrackets)

		for _, bracket := range solvedBrackets {
			bracket.replaceStringInstances(&equation)
		}
	}

	return solveNonBracketEquation(equation)
}

func solveEquationPt2(equation string) int {
	regex := regexp.MustCompile(bracketRegex)

	for regex.MatchString(equation) {

		nonNestedBrackets := regexp.MustCompile(bracketRegex).FindAllString(equation, -1)

		solvedBrackets := solveNonNestedBracketsPt2(nonNestedBrackets)

		for _, bracket := range solvedBrackets {
			bracket.replaceStringInstances(&equation)
		}
	}

	return solveNonBracketEquationPt2(equation)
}

// Part1 of day 18
func (d *Day18Computer) Part1(input shared.Input) (shared.Result, error) {

	sum := 0

	for _, equation := range input {
		sum += solveEquation(equation)
	}

	return fmt.Sprintf("%v", sum), nil
}

// Part2 of day 18
func (d *Day18Computer) Part2(input shared.Input) (shared.Result, error) {

	sum := 0

	for _, equation := range input {
		sum += solveEquationPt2(equation)
	}

	return fmt.Sprintf("%v", sum), nil
}
