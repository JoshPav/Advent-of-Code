package days

import (
	"testing"

	"../../shared"
)

func TestPart1_1(t *testing.T) {
	testDay := &Day0Computer{}

	res, err := testDay.Part1(shared.Input{"12"})

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "2" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart1_2(t *testing.T) {
	testDay := &Day0Computer{}

	res, err := testDay.Part1(shared.Input{"14"})

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "2" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart1_3(t *testing.T) {
	testDay := &Day0Computer{}

	res, err := testDay.Part1(shared.Input{"1969"})

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "654" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart1_4(t *testing.T) {
	testDay := &Day0Computer{}

	res, err := testDay.Part1(shared.Input{"100756"})

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "33583" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_1(t *testing.T) {
	testDay := &Day0Computer{}

	res, err := testDay.Part2(shared.Input{"14"})

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "2" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_2(t *testing.T) {
	testDay := &Day0Computer{}

	res, err := testDay.Part2(shared.Input{"1969"})

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "966" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_3(t *testing.T) {
	testDay := &Day0Computer{}

	res, err := testDay.Part2(shared.Input{"100756"})

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "50346" {
		t.Fatalf("Wrong result: %s", res)
	}
}
