package days

import (
	"errors"
	"regexp"
	"strconv"
	"strings"

	"../../shared"
	"../../shared/assembler"
)

// Day8Computer solves day8
type Day8Computer struct{}

func getUpdatedInstruction(instruction string) string {
	if match, _ := regexp.MatchString(`nop`, instruction); match {
		return strings.Replace(instruction, "nop", "jmp", 1)
	}
	return strings.Replace(instruction, "jmp", "nop", 1)
}

func getUpdatedBootCode(bootCode []string, i int) []string {
	updatedBootCode := shared.CreateCopy(bootCode)
	updatedBootCode[i] = getUpdatedInstruction(bootCode[i])
	return updatedBootCode
}

// Part1 of day 8
func (d *Day8Computer) Part1(bootCode shared.Input) (shared.Result, error) {

	val, err := assembler.NewAssembler(bootCode).Run()

	if _, ok := err.(*assembler.InstructionLoopError); ok {
		return strconv.Itoa(val), nil
	}

	return "", errors.New("Could not find loop")
}

// Part2 of day 8
func (d *Day8Computer) Part2(bootCode shared.Input) (shared.Result, error) {

	for i, line := range bootCode {
		if match, _ := regexp.MatchString(`nop|jmp`, line); match {

			if val, err := assembler.NewAssembler(getUpdatedBootCode(bootCode, i)).Run(); err == nil {
				return strconv.Itoa(val), nil
			}
		}
	}

	return "", errors.New("Could not find working program")
}
