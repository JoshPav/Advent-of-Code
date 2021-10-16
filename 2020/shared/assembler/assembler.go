package assembler

import (
	"strconv"
	"strings"
)

// InstructionMap stores the instruction against the instruction number
type InstructionMap map[int]AssemblyInstruction

// AssemblyInstruction stores the operation and value for an instruction
type AssemblyInstruction struct {
	operation string
	value     int
}

// Assembler used to compute the result of the instructions
type Assembler struct {
	instructions InstructionMap
}

// NewAssembler creates a new Assembler with a map created from the instructions
func NewAssembler(assemblyLines []string) *Assembler {
	assembler := new(Assembler)
	assembler.instructions = buildInstructionMap(assemblyLines)
	return assembler
}

// Run computes the result given the instructions stored in the Assembler
func (a *Assembler) Run() (int, error) {
	accumulator := 0
	i := 0

	visited := make(map[int]struct{})

	for i < len(a.instructions) {
		currentInstruction := a.instructions[i]
		if _, ok := visited[i]; ok {
			return accumulator, &InstructionLoopError{instructionNumber: i}
		}
		visited[i] = struct{}{}

		if currentInstruction.operation == "acc" {
			accumulator += currentInstruction.value
		} else if currentInstruction.operation == "jmp" {
			i += currentInstruction.value
			continue
		}
		i++
	}
	return accumulator, nil
}

func parseInstruction(line string) AssemblyInstruction {
	split := strings.Split(line, " ")
	parsedValue, _ := strconv.Atoi(split[1])
	return AssemblyInstruction{operation: split[0], value: parsedValue}
}

func buildInstructionMap(assemblyLines []string) InstructionMap {
	instructions := make(InstructionMap)
	for i, line := range assemblyLines {
		instructions[i] = parseInstruction(line)
	}
	return instructions
}
