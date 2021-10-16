package days

import (
	"regexp"
	"strconv"
	"strings"

	"../../shared"
)

const shinyGold = bagColour("shiny gold")

// Day7Computer solves day7
type Day7Computer struct{}

type bagColour = string

type bagContent struct {
	amount int
	colour bagColour
}

type bagRules = map[bagColour][]bagContent

func createBagContent(bag string) bagContent {
	matches := regexp.MustCompile(`([0-9]{1,})\s([a-z].*?)\sbag`).FindAllStringSubmatch(bag, -1)
	amount, _ := strconv.Atoi(matches[0][1])
	return bagContent{amount, matches[0][2]}
}

func createBagRules(input shared.Input) bagRules {
	bags := make(bagRules)

	for _, line := range input {

		bagContents := make([]bagContent, 0)

		bagColourAndContents := strings.Split(line, "contain")

		colour := strings.TrimSpace(strings.ReplaceAll(bagColourAndContents[0], " bags", ""))

		if strings.TrimSpace(bagColourAndContents[1]) != "no other bags." {
			for _, bagWithin := range strings.Split(bagColourAndContents[1], ",") {
				bagContents = append(bagContents, createBagContent(strings.TrimSpace(bagWithin)))
			}
		}

		bags[colour] = bagContents

	}
	return bags
}

func bagContainsBag(bags bagRules, currentBag bagColour, soughtBagColour bagColour) bool {
	for _, bag := range bags[currentBag] {
		if bag.colour == soughtBagColour || bagContainsBag(bags, bag.colour, soughtBagColour) {
			return true
		}
	}
	return false
}

func calcBagsContained(bags bagRules, currentBag string) int {
	bagCount := 0
	for _, bag := range bags[currentBag] {
		bagCount += bag.amount * (1 + calcBagsContained(bags, bag.colour))
	}
	return bagCount
}

// Part1 of day 7
func (d *Day7Computer) Part1(input shared.Input) (shared.Result, error) {

	bags := createBagRules(input)

	shinyGoldCount := 0

	for k := range bags {
		if bagContainsBag(bags, k, shinyGold) {
			shinyGoldCount++
		}
	}

	return strconv.Itoa(shinyGoldCount), nil
}

// Part2 of day 7
func (d *Day7Computer) Part2(input shared.Input) (shared.Result, error) {
	return strconv.Itoa(calcBagsContained(createBagRules(input), shinyGold)), nil
}
