package days

import (
	"testing"

	"../../shared"
)

func testInput() shared.Input {
	return shared.Input{
		"1721",
		"979",
		"366",
		"299",
		"675",
		"1456",
	}
}

func TestPart1(t *testing.T) {
	testDay := &Day1Computer{}

	res, err := testDay.Part1(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "514579" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2(t *testing.T) {
	testDay := &Day1Computer{}

	res, err := testDay.Part2(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "241861950" {
		t.Fatalf("Wrong result: %s", res)
	}
}
