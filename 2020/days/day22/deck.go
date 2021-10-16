package days

import (
	"strconv"
	"strings"
)

type deck struct {
	cards       []int
	cardsInDeck int
}

func newDeck() deck {
	return deck{cards: make([]int, 0), cardsInDeck: 0}
}

func (d *deck) createCopy(cardNumber int) deck {
	deckCopy := newDeck()

	for i := d.cardsInDeck - 1; i > d.cardsInDeck-cardNumber-1; i-- {
		deckCopy.placeOnBottom(d.cards[i])
	}

	return deckCopy
}

func (d *deck) deckMatches(other deck) bool {
	if len(d.cards) == len(other.cards) {
		for i, card := range d.cards {
			if other.cards[i] != card {
				return false
			}
		}

		return true
	}
	return false
}

func (d *deck) calculateScore() int {
	score := 0

	for i, card := range d.cards {
		score += (i + 1) * card
	}
	return score
}

func (d *deck) placeOnBottom(card int) {
	d.cards = append([]int{card}, d.cards...)
	d.cardsInDeck++
}

func (d *deck) placeOnTop(card int) {
	d.cards = append(d.cards, card)
	d.cardsInDeck++
}

func (d *deck) takeFromBottom() int {
	bottomCard := d.cards[0]
	d.cards = d.cards[1:d.cardsInDeck]
	d.cardsInDeck--
	return bottomCard
}

func (d *deck) takeFromTop() int {
	topCard := d.cards[d.cardsInDeck-1]
	d.cards = d.cards[0 : d.cardsInDeck-1]
	d.cardsInDeck--
	return topCard
}

func (d *deck) toString() string {
	var asString strings.Builder
	for i := len(d.cards) - 1; i >= 0; i-- {
		asString.WriteString(strconv.Itoa(d.cards[i]))
		if i != 0 {
			asString.WriteString(", ")
		}
	}
	return asString.String()
}
