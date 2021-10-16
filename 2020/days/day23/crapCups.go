package days

import (
	"fmt"
	"math"
	"strconv"
	"strings"

	"../../shared"
)

const debug = false

// CrabCups -
type CrabCups struct {
	gameState   LinkedList
	currentCup  *int
	currentMove int
	lowestCup   int
	highestCup  int
}

func createCrapCupsGameFromInput(input shared.Input) CrabCups {
	cupList := NewLinkedList()

	min := math.MaxInt16
	max := math.MinInt16

	for _, num := range input[0] {
		asInt, _ := strconv.Atoi(string(num))

		min = int(math.Min(float64(min), float64(asInt)))
		max = int(math.Max(float64(max), float64(asInt)))

		cupList.Add(asInt)
	}

	return CrabCups{gameState: cupList, currentCup: cupList.head, currentMove: 1, lowestCup: min, highestCup: max}
}

func createCrapCupsGamePt2FromInput(input shared.Input) CrabCups {
	cupList := NewLinkedList()

	min := math.MaxInt16
	max := math.MinInt16

	for _, num := range input[0] {
		asInt, _ := strconv.Atoi(string(num))

		min = int(math.Min(float64(min), float64(asInt)))
		max = int(math.Max(float64(max), float64(asInt)))

		cupList.Add(asInt)
	}

	for i := max + 1; i <= 1000000; i++ {
		cupList.Add(i)
	}

	return CrabCups{gameState: cupList, currentCup: cupList.head, currentMove: 1, lowestCup: min, highestCup: 1000000}
}

func (cc *CrabCups) pickUpNCups(n int) []int {

	pickedUpCups := cc.gameState.GetNextN(*cc.currentCup, 3)

	if debug {
		fmt.Print("pick up: ")
		for _, cup := range pickedUpCups {
			fmt.Print(cup, " ")
		}
		fmt.Print("\n")
	}

	return pickedUpCups
}

// PlayMove -
func (cc *CrabCups) PlayMove() {

	if debug {
		fmt.Println("-- move", cc.currentMove, "--")
		cc.PrintState()
	}

	// Picks up 3 cups clockwise of current
	pickedUpCups := cc.pickUpNCups(3)

	// Select destination cup
	destinationCup := cc.getDestinationCup(pickedUpCups)

	if debug {
		fmt.Print("destination:", destinationCup, "\n\n")
	}

	// Add all picked up cups after the destintation cup
	cc.gameState.UpdateOrder(pickedUpCups[0], destinationCup, 3)

	// Select new cup clockwise of current cup
	cc.currentCup = &cc.gameState.GetNextN(*cc.currentCup, 1)[0]

	cc.currentMove++
}

func (cc *CrabCups) getDestinationCup(pickedUpCups []int) int {

	destinationCup := checkWrapAround((*cc.currentCup)-1, cc.lowestCup, cc.highestCup)

	for valueInList(destinationCup, pickedUpCups) {
		destinationCup--
		destinationCup = checkWrapAround(destinationCup, cc.lowestCup, cc.highestCup)
	}

	return destinationCup
}

func checkWrapAround(current, min, max int) int {
	if current < min {
		return max
	}
	return current
}

func valueInList(value int, list []int) bool {

	for _, v := range list {
		if v == value {
			return true
		}
	}
	return false
}

// PlayNMoves -
func (cc *CrabCups) PlayNMoves(n int) {
	for i := 0; i < n; i++ {
		cc.PlayMove()
	}
	if debug {
		fmt.Println("-- final --")
		cc.PrintState()
	}
}

// GetCupsHidingStars -
func (cc *CrabCups) GetCupsHidingStars() []int {
	return cc.gameState.GetNextN(1, 2)
}

// GetLabelsAfterCup -
func (cc *CrabCups) GetLabelsAfterCup(cupNumber int) string {

	var result strings.Builder
	first := true
	currentCup := cc.gameState.head
	for (*currentCup) != cupNumber || first {

		if !first {
			result.WriteString(fmt.Sprintf("%v", (*currentCup)))
		}

		if (*currentCup) == cupNumber {
			first = false
		}
		currentCup = &cc.gameState.GetNextN(*currentCup, 1)[0]
	}
	return result.String()
}

// PrintState -
func (cc *CrabCups) PrintState() {
	fmt.Println("cups:", cc.gameState.ToString((*cc.currentCup)))
}
