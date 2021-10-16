package assembler

import "fmt"

// InstructionLoopError - An error that occurs when a loop is detected in the the assembly code
type InstructionLoopError struct {
	instructionNumber int
}

func (e *InstructionLoopError) Error() string {
	return fmt.Sprintf("Loop in instructions detected. Start of loop at instruction #%d", e.instructionNumber)
}
