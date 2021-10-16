package days

import (
	"testing"

	"../../shared"
)

func testInput() shared.Input {
	return shared.Input{
		"light red bags contain 1 bright white bag, 2 muted yellow bags.",
		"dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
		"bright white bags contain 1 shiny gold bag.",
		"muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
		"shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
		"dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
		"vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
		"faded blue bags contain no other bags.",
		"dotted black bags contain no other bags.",
	}
}

func testInput2() shared.Input {
	return shared.Input{
		"shiny gold bags contain 2 dark red bags.",
		"dark red bags contain 2 dark orange bags.",
		"dark orange bags contain 2 dark yellow bags.",
		"dark yellow bags contain 2 dark green bags.",
		"dark green bags contain 2 dark blue bags.",
		"dark blue bags contain 2 dark violet bags.",
		"dark violet bags contain no other bags.",
	}
}

func TestPart1(t *testing.T) {
	testDay := &Day7Computer{}

	res, err := testDay.Part1(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "4" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_1(t *testing.T) {
	testDay := &Day7Computer{}

	res, err := testDay.Part2(testInput())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "32" {
		t.Fatalf("Wrong result: %s", res)
	}
}

func TestPart2_2(t *testing.T) {
	testDay := &Day7Computer{}

	res, err := testDay.Part2(testInput2())

	if err != nil {
		t.Fatalf(err.Error())
	}

	if res != "126" {
		t.Fatalf("Wrong result: %s", res)
	}
}
