package days

import (
	"fmt"
	"strconv"

	"../../shared"
)

const initialSubjectNumber = 7

// Day25Computer solves day25
type Day25Computer struct{}

func getLoopSize(publicKey, subjectNumber int) int {

	value := 1

	loopSize := 0

	for value != publicKey {
		value *= subjectNumber
		value %= 20201227
		loopSize++
	}

	return loopSize
}

func transformSubjectNumber(subjectNumber, loopSize int) int {

	value := 1

	for i := 0; i < loopSize; i++ {
		value *= subjectNumber
		value %= 20201227
	}

	return value

}

// Part1 of day 25
func (d *Day25Computer) Part1(input shared.Input) (shared.Result, error) {

	cardPublicKey, _ := strconv.Atoi(input[0])

	doorPublicKey, _ := strconv.Atoi(input[1])
	doorLoopSize := getLoopSize(doorPublicKey, initialSubjectNumber)

	cardEncryptionKey := transformSubjectNumber(cardPublicKey, doorLoopSize)

	return fmt.Sprintf("%v", cardEncryptionKey), nil
}

// Part2 of day 25
func (d *Day25Computer) Part2(input shared.Input) (shared.Result, error) {

	return "", nil
}
