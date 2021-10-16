package days

import (
	"regexp"
	"strconv"
	"strings"

	"../../shared"
)

// Day14Computer solves day14
type Day14Computer struct{}

type bitmask = [36]int

var possibleFloatingBitValues = [...]rune{'0', '1'}

func withLeadingZeros(num string) string {
	result := num
	for len(result) < 36 {
		result = "0" + result
	}
	return result
}

func getIndexAndAmount(line string) (int64, int64) {
	index, _ := strconv.ParseInt(regexp.MustCompile(`mem\[([0-9]*)\]`).FindAllStringSubmatch(line, -1)[0][1], 10, 64)
	amount, _ := strconv.ParseInt(regexp.MustCompile(`= ([0-9]*)`).FindAllStringSubmatch(line, -1)[0][1], 10, 64)
	return index, amount
}

func asBinaryString(num int64) string {
	asBinary := strconv.FormatInt(num, 2)
	return withLeadingZeros(asBinary)
}

func applyMaskToBinary(binaryNum, mask string) string {
	if len(binaryNum) != len(mask) {
		return binaryNum
	}

	var builder strings.Builder

	for i, bit := range mask {
		if bit != 'X' {
			builder.WriteRune(bit)
		} else {
			builder.WriteRune(rune(binaryNum[i]))
		}
	}
	return builder.String()
}

func applyMaskToBinaryPt2(binaryNum, mask string) []int64 {
	if len(binaryNum) != len(mask) {
		return getCombinationsFromFloatingNumber(binaryNum)
	}

	var builder strings.Builder

	for i, bit := range mask {
		if bit == '0' {
			builder.WriteRune(rune(binaryNum[i]))
		} else {
			builder.WriteRune(bit)
		}
	}

	return getCombinationsFromFloatingNumber(builder.String())
}

func getCombinationsFromFloatingNumber(floatingNumber string) []int64 {
	return getCombinationsFromFloatingNumberRec(floatingNumber, 0)
}

func getUpdatedFloatingNumber(num string, bit rune, index int) string {
	var updated strings.Builder
	updated.WriteString(num[0:index])
	updated.WriteRune(bit)
	updated.WriteString(num[index+1:])
	return updated.String()
}

func getCombinationsFromFloatingNumberRec(floatingNumber string, index int) []int64 {

	result := make([]int64, 0)

	for i := index; i < len(floatingNumber); i++ {

		if floatingNumber[i] == 'X' {

			for _, bit := range possibleFloatingBitValues {

				for _, res := range getCombinationsFromFloatingNumberRec(getUpdatedFloatingNumber(floatingNumber, bit, i), i) {
					result = append(result, res)
				}

			}

			break
		}

		if i == len(floatingNumber)-1 {
			asInt, _ := strconv.ParseInt(floatingNumber, 2, 64)
			result = append(result, asInt)
		}

	}

	return result
}

func getTotal(memory map[int64]int64) int64 {
	var total int64
	total = 0

	for _, value := range memory {
		total += value
	}
	return total
}

// Part1 of day 10
func (d *Day14Computer) Part1(input shared.Input) (shared.Result, error) {

	memory := make(map[int64]int64)

	var mask string

	for i := 0; i < len(input); i++ {

		line := input[i]

		if strings.Contains(line, "mask") {
			mask = strings.Replace(line, "mask = ", "", 1)
		} else {
			index, amount := getIndexAndAmount(line)

			amountAsBinary := asBinaryString(amount)

			withMaskApplied := applyMaskToBinary(amountAsBinary, mask)

			asInt, _ := strconv.ParseInt(withMaskApplied, 2, 64)

			memory[index] = asInt

		}
	}

	return strconv.FormatInt(getTotal(memory), 10), nil
}

// Part2 of day 10
func (d *Day14Computer) Part2(input shared.Input) (shared.Result, error) {

	memory := make(map[int64]int64)

	var mask string

	for i := 0; i < len(input); i++ {

		line := input[i]

		if strings.Contains(line, "mask") {
			mask = strings.Replace(line, "mask = ", "", 1)
		} else {
			index, amount := getIndexAndAmount(line)

			indexAsBinary := asBinaryString(index)

			memoryAddresses := applyMaskToBinaryPt2(indexAsBinary, mask)

			for _, address := range memoryAddresses {
				memory[address] = amount
			}
		}
	}

	return strconv.FormatInt(getTotal(memory), 10), nil
}
