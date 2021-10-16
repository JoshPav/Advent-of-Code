package days

import (
	"testing"

	"../../shared"
)

func testInput() shared.Input {
	return shared.Input{
		"abc",
		"",
		"a",
		"b",
		"c",
		"",
		"ab",
		"ac",
		"",
		"a",
		"a",
		"a",
		"a",
		"",
		"b",
	}
}

func TestPart1(t *testing.T) {
	testDay := &Day6Computer{}

	res, err := testDay.Part1(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "11" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2(t *testing.T) {
	testDay := &Day6Computer{}

	res, err := testDay.Part2(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "6" {
		t.Fatalf("Wrong result: %s", res)
	}
}
