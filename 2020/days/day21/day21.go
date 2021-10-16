package days

import (
	"sort"
	"strconv"
	"strings"

	"../../shared"
)

// Day21Computer solves day21
type Day21Computer struct{}

const allergenStartString = "(contains "

func getAllergenStartIndex(line string) int {
	return strings.Index(line, allergenStartString)
}

func getAllergens(line string) []string {
	return strings.Split(line[getAllergenStartIndex(line)+len(allergenStartString):len(line)-1], ", ")
}

func getIngredients(line string) []string {
	return strings.Split(line[0:getAllergenStartIndex(line)-1], " ")
}

func getIntersection(a, b []string) []string {
	intersection := make([]string, 0)
	for _, aItem := range a {
		for _, bItem := range b {
			if aItem == bItem {
				intersection = append(intersection, aItem)
			}
		}
	}
	return intersection
}

// Part1 of day 21
func (d *Day21Computer) Part1(input shared.Input) (shared.Result, error) {

	allergenSource := make(map[string][]string)
	allIngredients := make([][]string, 0)

	for _, line := range input {

		allergens := getAllergens(line)
		ingredients := getIngredients(line)
		allIngredients = append(allIngredients, ingredients)

		for _, allergen := range allergens {
			if _, ok := allergenSource[allergen]; ok {
				allergenSource[allergen] = getIntersection(allergenSource[allergen], ingredients)
			} else {
				allergenSource[allergen] = ingredients
			}
		}
	}

	allergenCause := getAllergensAndCause(allergenSource)

	return strconv.Itoa(countNonAllergens(allIngredients, allergenCause)), nil
}

func withStringRemoved(ingredients []string, toRemove string) []string {

	result := make([]string, 0)

	for _, value := range ingredients {
		if value != toRemove {
			result = append(result, value)
		}
	}

	return result
}

func getCanonicalDangerousIngredientList(ingredientCause map[string]string) string {

	allAllergens := make([]string, 0)

	flippedMap := make(map[string]string)

	for ingredient, allergen := range ingredientCause {
		allAllergens = append(allAllergens, allergen)
		flippedMap[allergen] = ingredient
	}

	sort.Strings(allAllergens)

	var result strings.Builder

	for i, allergen := range allAllergens {
		result.WriteString(flippedMap[allergen])
		if i != len(allAllergens)-1 {
			result.WriteRune(',')
		}
	}

	return result.String()
}

func removeValuesFromMap(values []string, sliceMap *map[string][]string) {
	for _, value := range values {
		for k, v := range *sliceMap {
			(*sliceMap)[k] = withStringRemoved(v, value)

		}
	}
}

func extractSingletons(toAddTo *map[string]string, toRemoveFrom *map[string][]string) []string {
	extractedValues := make([]string, 0)

	for k, values := range *toRemoveFrom {
		if len(values) == 1 {
			(*toAddTo)[values[0]] = k
			extractedValues = append(extractedValues, values[0])
			delete(*toRemoveFrom, k)
		}
	}

	return extractedValues
}

func getAllergensAndCause(allergenSource map[string][]string) map[string]string {

	ingredientCause := make(map[string]string)

	for len(allergenSource) > 0 {

		toRemove := extractSingletons(&ingredientCause, &allergenSource)

		removeValuesFromMap(toRemove, &allergenSource)

	}

	return ingredientCause
}

func countNonAllergens(allIngredients [][]string, allergenCause map[string]string) int {

	count := 0

	for _, foodIngredients := range allIngredients {
		for _, ingredient := range foodIngredients {
			if _, ok := allergenCause[ingredient]; !ok {
				count++
			}
		}
	}

	return count
}

// Part2 of day 21
func (d *Day21Computer) Part2(input shared.Input) (shared.Result, error) {

	allergenSource := make(map[string][]string)
	allIngredients := make([][]string, 0)

	for _, line := range input {

		allergens := getAllergens(line)
		ingredients := getIngredients(line)
		allIngredients = append(allIngredients, ingredients)

		for _, allergen := range allergens {
			if _, ok := allergenSource[allergen]; ok {
				allergenSource[allergen] = getIntersection(allergenSource[allergen], ingredients)
			} else {
				allergenSource[allergen] = ingredients
			}
		}
	}

	allergenCause := getAllergensAndCause(allergenSource)

	return getCanonicalDangerousIngredientList(allergenCause), nil
}
