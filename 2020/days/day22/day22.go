package days

import (
	"strconv"

	"../../shared"
)

const printGame1 = false
const printGame2 = false

// Day22Computer solves day22
type Day22Computer struct{}

func createDecksFromInput(input shared.Input) (deck, deck) {
	playerOneDeck := newDeck()
	playerTwoDeck := newDeck()

	currentDeck := &playerOneDeck

	for _, line := range input {

		if line == "Player 2:" {
			currentDeck = &playerTwoDeck
		} else if card, err := strconv.Atoi(line); err == nil {
			currentDeck.placeOnBottom(card)
		}
	}

	return playerOneDeck, playerTwoDeck
}

// Part1 of day 22
func (d *Day22Computer) Part1(input shared.Input) (shared.Result, error) {

	playerOneDeck, playerTwoDeck := createDecksFromInput(input)

	winningDeck := playCombatGame(&playerOneDeck, &playerTwoDeck)

	return strconv.Itoa(winningDeck.calculateScore()), nil
}

// Part2 of day 22
func (d *Day22Computer) Part2(input shared.Input) (shared.Result, error) {

	playerOneDeck, playerTwoDeck := createDecksFromInput(input)

	gameRoundHistory := make([]roundHistory, 0)

	winningDeck, _ := playRecursiveCombatGame(&playerOneDeck, &playerTwoDeck, &gameRoundHistory, 1)

	return strconv.Itoa(winningDeck.calculateScore()), nil
}
