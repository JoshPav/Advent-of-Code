package days

import "fmt"

type roundHistory struct {
	p1 deck
	p2 deck
}

func (history *roundHistory) decksMatch(p1, p2 deck) bool {
	return p1.deckMatches(history.p1) && p2.deckMatches(history.p2)
}

func playRecursiveCombatRound(p1, p2 *deck, previousRounds *[]roundHistory, roundNum, gameNum int) bool {

	// Round Starts
	if printGame2 {
		fmt.Println("\n-- Round", roundNum, "(Game", gameNum, ") --")
		fmt.Println("Player 1's deck:", p1.toString())
		fmt.Println("Player 2's deck:", p2.toString())
	}
	var roundWinner int

	// Before card is dealt check previous hands
	for _, history := range *previousRounds {
		if history.decksMatch(*p1, *p2) {

			if printGame2 {
				fmt.Print("\n\n===========================\nDecks seen before, P1 automatically wins\n")
				fmt.Print(previousRounds, "\n")
				fmt.Print("p1: ", p1.toString(), "\np2:", p2.toString())
				fmt.Print("\n===========================\n\n")

			}

			// Game is won
			return true
		}
	}

	// Add Cards to list
	*previousRounds = append(*previousRounds, roundHistory{*p1, *p2})

	// Deals cards
	p1Card := p1.takeFromTop()
	p2Card := p2.takeFromTop()
	if printGame2 {
		fmt.Println("Player 1 plays:", p1Card)
		fmt.Println("Player 2 plays:", p2Card)
	}
	if p1Card <= p1.cardsInDeck && p2Card <= p2.cardsInDeck {

		// Start a recursive round

		p1NewDeck := p1.createCopy(p1Card)
		p2NewDeck := p2.createCopy(p2Card)

		newGameRoundHistory := make([]roundHistory, 0)

		_, roundWinner = playRecursiveCombatGame(&p1NewDeck, &p2NewDeck, &newGameRoundHistory, gameNum+1)
	} else { // Play a normal round
		if p1Card > p2Card {
			roundWinner = 1
		} else {
			roundWinner = 2
		}
	}

	if printGame2 {
		fmt.Print("Player", roundWinner, "wins round", roundNum, "of game", gameNum, "!\n\n")
	}
	if roundWinner == 1 {
		p1.placeOnBottom(p1Card)
		p1.placeOnBottom(p2Card)
	} else {
		p2.placeOnBottom(p2Card)
		p2.placeOnBottom(p1Card)
	}

	return false
}

func playRecursiveCombatGame(p1, p2 *deck, previousDecks *[]roundHistory, gameNum int) (deck, int) {

	if printGame2 {
		fmt.Println("\n=== Game", gameNum, "===")
	}
	round := 1
	previousRoundMatch := false

	for p1.cardsInDeck > 0 && p2.cardsInDeck > 0 && !previousRoundMatch {

		previousRoundMatch = playRecursiveCombatRound(p1, p2, previousDecks, round, gameNum)
		round++
	}

	if p1.cardsInDeck == 0 {
		return *p2, 2
	}
	return *p1, 1
}
