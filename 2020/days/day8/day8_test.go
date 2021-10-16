package days

import (
	"testing"

	"../../shared"
)

func testInput() shared.Input {
	return shared.Input{
		"nop +0",
		"acc +1",
		"jmp +4",
		"acc +3",
		"jmp -3",
		"acc -99",
		"acc +1",
		"jmp -4",
		"acc +6",
	}
}

func TestPart1(t *testing.T) {
	testDay := &Day8Computer{}

	res, err := testDay.Part1(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "5" {
		t.Fatalf("Wrong result: %s",
			res)
	}
}

func TestPart2(t *testing.T) {
	testDay := &Day8Computer{}

	res, err := testDay.Part2(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "8" {
		t.Fatalf("Wrong result: %s",
			res)
	}
}
