package days

import (
	"testing"

	"../../shared"
)

func testInput1() shared.Input {
	return shared.Input{
		"16",
		"10",
		"15",
		"5",
		"1",
		"11",
		"7",
		"19",
		"6",
		"12",
		"4",
	}
}

func testInput2() shared.Input {
	return shared.Input{
		"28",
		"33",
		"18",
		"42",
		"31",
		"14",
		"46",
		"20",
		"48",
		"47",
		"24",
		"23",
		"49",
		"45",
		"19",
		"38",
		"39",
		"11",
		"1",
		"32",
		"25",
		"35",
		"8",
		"17",
		"7",
		"9",
		"4",
		"2",
		"34",
		"10",
		"3",
	}
}

func TestPart1_Input1(t *testing.T) {
	testDay := &Day10Computer{}

	res, err := testDay.Part1(testInput1())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "35" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart1_Input2(t *testing.T) {
	testDay := &Day10Computer{}

	res, err := testDay.Part1(testInput2())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "220" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input1(t *testing.T) {
	testDay := &Day10Computer{}

	res, err := testDay.Part2(testInput1())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "8" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_Input2(t *testing.T) {
	testDay := &Day10Computer{}

	res, err := testDay.Part2(testInput2())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "19208" {
		t.Fatalf("Wrong result: %s", res)
	}
}
