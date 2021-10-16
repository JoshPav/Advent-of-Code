package days

import (
	"testing"
)

func testInput() []int {
	return []int{
		35,
		20,
		15,
		25,
		47,
		40,
		62,
		55,
		65,
		95,
		102,
		117,
		150,
		182,
		127,
		219,
		299,
		277,
		309,
		576,
	}
}

func Test_FindContiguousSequenceForNumber_sequenceFound(t *testing.T) {

	sequence := findContiguousSequenceForNumber(127, testInput())

	expectedSequence := []int{15, 25, 47, 40}

	for i := range sequence {
		if sequence[i] != expectedSequence[i] {
			t.Fatalf("Wrong result: %v", sequence[i])
		}
	}
}

func Test_FindContiguousSequenceForNumber_noSequence(t *testing.T) {

	input := []int{35, 20, 15, 25, 47}

	sequence := findContiguousSequenceForNumber(127, input)

	if sequence != nil {
		t.Fatalf("Got sequence %v instead of null", sequence)
	}
}

func Test_getMinPlusMax(t *testing.T) {

	res := getMinPlusMax(testInput())

	if res != 591 {
		t.Fatalf("Wrong result: %v", res)
	}

}

func Test_findNumberThatIsNotSumOfPrevious(t *testing.T) {

	res, err := findNumberThatIsNotSumOfPrevious(testInput(), 5)

	if err != nil {
		t.Fatalf("Should not have got an err: %v", res)
	}

	if res != 127 {
		t.Fatalf("Wrong result: %v", res)
	}

}

func Test_getAllPreviousNumberSums(t *testing.T) {

	input := testInput()[0:5]

	sums := getAllPreviousNumberSums(input)

	expected := []int{55, 50, 60, 82, 35, 45, 67, 40, 62, 72}

	if len(sums) != len(expected) {
		t.Fatalf("Did not get enough results: %v Expected: %v", len(sums), len(expected))

	}

	for _, val := range expected {
		if _, ok := sums[val]; !ok {
			t.Fatalf("Number missing: %v", val)
		}
	}
}

func Test_isNumberSumOfPreviousNumbers_True(t *testing.T) {

	res := isNumberSumOfPreviousNumbers(55, testInput()[0:5])

	if !res {
		t.Fatalf("Got false, should be true")
	}

}

func Test_isNumberSumOfPreviousNumbers_False(t *testing.T) {

	res := isNumberSumOfPreviousNumbers(16, testInput()[0:5])

	if res {
		t.Fatalf("Got true, should be false")
	}

}
