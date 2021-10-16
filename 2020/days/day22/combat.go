package days

import "fmt"

func playCombatRound(p1, p2 *deck) {

	p1Card := p1.takeFromTop()
	p2Card := p2.takeFromTop()

	if p1Card > p2Card {
		p1.placeOnBottom(p1Card)
		p1.placeOnBottom(p2Card)
	} else if p2Card > p1Card {
		p2.placeOnBottom(p2Card)
		p2.placeOnBottom(p1Card)
	}
}

func playCombatGame(p1, p2 *deck) deck {

	round := 1
	for p1.cardsInDeck > 0 && p2.cardsInDeck > 0 {

		playCombatRound(p1, p2)

		if printGame1 {
			fmt.Print("\n=== Round:", round, "===\n")
			fmt.Println("P1: ", p1.toString())
			fmt.Println("P2: ", p2.toString())
		}
		round++
	}

	if p1.cardsInDeck == 0 {
		return *p2
	}
	return *p1
}
