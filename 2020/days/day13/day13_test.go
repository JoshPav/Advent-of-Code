package days

import (
	"testing"

	"../../shared"
)

func testInput() shared.Input {
	return shared.Input{
		"939",
		"7,13,x,x,59,x,31,19",
	}
}

func TestPart1_Input1(t *testing.T) {
	testDay := &Day13Computer{}

	res, err := testDay.Part1(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "295" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input1(t *testing.T) {
	testDay := &Day13Computer{}

	res, err := testDay.Part2(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "1068781" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input2(t *testing.T) {
	testDay := &Day13Computer{}

	testInput := shared.Input{
		"",
		"17,x,13,19",
	}

	res, err := testDay.Part2(testInput)

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "3417" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input3(t *testing.T) {
	testDay := &Day13Computer{}

	testInput := shared.Input{
		"",
		"67,7,59,61",
	}

	res, err := testDay.Part2(testInput)

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "754018" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input4(t *testing.T) {
	testDay := &Day13Computer{}

	testInput := shared.Input{
		"",
		"67,x,7,59,61",
	}

	res, err := testDay.Part2(testInput)

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "779210" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input5(t *testing.T) {
	testDay := &Day13Computer{}

	testInput := shared.Input{
		"",
		"67,7,x,59,61",
	}

	res, err := testDay.Part2(testInput)

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "1261476" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input6(t *testing.T) {
	testDay := &Day13Computer{}

	testInput := shared.Input{
		"",
		"1789,37,47,1889",
	}

	res, err := testDay.Part2(testInput)

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "1202161486" {
		t.Fatalf("Wrong result: %s", res)
	}
}
