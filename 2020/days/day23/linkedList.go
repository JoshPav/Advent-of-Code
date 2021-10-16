package days

import (
	"fmt"
	"strings"
)

// Node -
type Node struct {
	prev int
	next int
}

// LinkedList -
type LinkedList struct {
	list map[int]*Node
	head *int
}

// NewLinkedList -
func NewLinkedList() LinkedList {
	return LinkedList{list: make(map[int]*Node)}
}

// Add -
func (ll *LinkedList) Add(toAdd int) {
	if ll.head == nil {
		ll.head = &toAdd
		ll.list[toAdd] = &Node{toAdd, toAdd}
	} else {

		lastInList := ll.list[*ll.head].prev

		ll.list[*ll.head].prev = toAdd

		ll.list[lastInList].next = toAdd
		ll.list[toAdd] = &Node{lastInList, *ll.head}

	}
}

// UpdateOrder -
func (ll *LinkedList) UpdateOrder(toMove, destination, amountToMove int) {

	endOfChain := toMove

	for i := 1; i < amountToMove; i++ {
		endOfChain = ll.list[endOfChain].next
	}

	// Set previous next to end of chain next
	ll.list[ll.list[toMove].prev].next = ll.list[endOfChain].next

	// Set end of chain previous to previous
	ll.list[ll.list[endOfChain].next].prev = ll.list[toMove].prev

	// Set end of chain next to destination next
	ll.list[endOfChain].next = ll.list[destination].next

	ll.list[ll.list[destination].next].prev = endOfChain

	// Set destination next to toMove
	ll.list[destination].next = toMove

	ll.list[toMove].prev = destination

}

// GetNextN -
func (ll *LinkedList) GetNextN(current, n int) []int {

	nextN := make([]int, 0)

	currentNode := current

	for i := 0; i < n; i++ {
		next := ll.list[currentNode].next
		nextN = append(nextN, next)
		currentNode = next
	}

	return nextN

}

// ToString -
func (ll *LinkedList) ToString(currentVal int) string {
	var result strings.Builder
	isFirst := true
	currentNode := ll.head

	for *currentNode != *ll.head || isFirst {
		nodeValue := *currentNode

		if currentVal == nodeValue {
			result.WriteString(fmt.Sprintf("(%v)", nodeValue))
		} else {
			result.WriteString(fmt.Sprintf("%v", nodeValue))
		}

		nextNode := &ll.list[nodeValue].next

		if *nextNode != *ll.head || isFirst {
			result.WriteString(" -> ")
		}

		currentNode = nextNode
		isFirst = false
	}
	return result.String()
}
