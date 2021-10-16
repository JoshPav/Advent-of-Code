package days

import (
	"testing"
)

func TestPart1_Input1(t *testing.T) {

	result := solveEquation("1 + (2 * 3) + (4 * (5 + 6))")

	if result != 51 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart1_Input2(t *testing.T) {

	result := solveEquation("2 * 3 + (4 * 5)")

	if result != 26 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart1_Input3(t *testing.T) {

	result := solveEquation("5 + (8 * 3 + 9 + 3 * 4 * 3)")

	if result != 437 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart1_Input4(t *testing.T) {

	result := solveEquation("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")

	if result != 12240 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart1_Input5(t *testing.T) {

	result := solveEquation("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")

	if result != 13632 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart2_Input1(t *testing.T) {

	result := solveEquationPt2("1 + (2 * 3) + (4 * (5 + 6))")

	if result != 51 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart2_Input2(t *testing.T) {

	result := solveEquationPt2("2 * 3 + (4 * 5)")

	if result != 46 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart2_Input3(t *testing.T) {

	result := solveEquationPt2("5 + (8 * 3 + 9 + 3 * 4 * 3)")

	if result != 1445 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart2_Input4(t *testing.T) {

	result := solveEquationPt2("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")

	if result != 669060 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart2_Input5(t *testing.T) {

	result := solveEquationPt2("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")

	if result != 23340 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart2_Input6(t *testing.T) {

	result := solveEquationPt2("5 * 5 + 4")

	if result != 45 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestPart2_Input7(t *testing.T) {

	result := solveEquationPt2("(7 + 2) + (4 + 6 * 5 * 7 + 4)")

	if result != 559 {
		t.Fatalf("Wrong result: %v", result)
	}
}

func TestEquationReplace(t *testing.T) {

	equationString := "4 + 9 * 9 + 4 + 975 * 9 + 4 + 9"

	expected := "13 * 9 + 4 + 975 * 9 + 13"

	equation := equationSolution{"4 + 9", 13}

	equation.replaceAdditionInstances(&equationString)

	if equationString != expected {
		t.Fatalf("Wrong result: %s", equationString)
	}

}

func TestEquationReplace2(t *testing.T) {

	equationString := "5 * 14 + 7 * 4 + 7"

	expected := "5 * 14 + 7 * 11"

	equation := equationSolution{"4 + 7", 11}

	equation.replaceAdditionInstances(&equationString)

	if equationString != expected {
		t.Fatalf("Wrong result: %s", equationString)
	}

}
