package days

import (
	"testing"
)

func TestGetNumberSpokenOnTurn_Input1(t *testing.T) {
	res := getNumberSpokenOnTurn([]int{0, 3, 6}, 2020)

	if res != 436 {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestGetNumberSpokenOnTurn_Input2(t *testing.T) {
	res := getNumberSpokenOnTurn([]int{1, 3, 2}, 2020)

	if res != 1 {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestGetNumberSpokenOnTurn_Input3(t *testing.T) {
	res := getNumberSpokenOnTurn([]int{2, 1, 3}, 2020)

	if res != 10 {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestGetNumberSpokenOnTurn_Input4(t *testing.T) {
	res := getNumberSpokenOnTurn([]int{1, 2, 3}, 2020)

	if res != 27 {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestGetNumberSpokenOnTurn_Input5(t *testing.T) {
	res := getNumberSpokenOnTurn([]int{2, 3, 1}, 2020)

	if res != 78 {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestGetNumberSpokenOnTurn_Input6(t *testing.T) {
	res := getNumberSpokenOnTurn([]int{3, 2, 1}, 2020)

	if res != 438 {
		t.Fatalf("Wrong result: %v", res)
	}
}

func TestGetNumberSpokenOnTurn_Input7(t *testing.T) {
	res := getNumberSpokenOnTurn([]int{3, 1, 2}, 2020)

	if res != 1836 {
		t.Fatalf("Wrong result: %v", res)
	}
}
