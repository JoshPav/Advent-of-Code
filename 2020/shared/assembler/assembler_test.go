package assembler

import (
	"testing"
)

func Test_parseInstruction_Positive(t *testing.T) {

	instruction := "nop +4"

	res := parseInstruction(instruction)

	if res.operation != "nop" && res.value != 4 {
		t.Fatalf("Wrong result: %s %v",
			res.operation, res.value)
	}
}

func Test_parseInstruction_Negative(t *testing.T) {

	instruction := "jmp -4"

	res := parseInstruction(instruction)

	if res.operation != "jmp" && res.value != -4 {
		t.Fatalf("Wrong result: %s %v",
			res.operation, res.value)
	}
}

func Test_buildInstructionMap(t *testing.T) {

	instructions := []string{
		"nop +0",
		"acc +1",
		"jmp +4",
	}

	res := buildInstructionMap(instructions)

	if instructionOne := res[0]; instructionOne.operation != "nop" && instructionOne.value != 0 {
		t.Fatalf("Wrong first instruction: %s %v",
			instructionOne.operation, instructionOne.value)
	}

	if instructionTwo := res[1]; instructionTwo.operation != "acc" && instructionTwo.value != 1 {
		t.Fatalf("Wrong second instruction: %s %v",
			instructionTwo.operation, instructionTwo.value)
	}

	if instructionThree := res[2]; instructionThree.operation != "jmp" && instructionThree.value != 4 {
		t.Fatalf("Wrong third instruction: %s %v",
			instructionThree.operation, instructionThree.value)
	}

}

func Test_Run_Loop(t *testing.T) {

	instructions := []string{
		"acc +3",
		"acc +4",
		"jmp -2",
	}

	res, err := NewAssembler(instructions).Run()

	if _, ok := err.(*InstructionLoopError); !ok {
		t.Fatalf("Did not return correct error")
	}

	if res != 7 {
		t.Fatalf("Did not return correct value")
	}

}

func Test_Run_ValidCode(t *testing.T) {

	instructions := []string{
		"acc +3",
		"jmp +3",
		"acc +4",
		"jmp +3",
		"jmp -2",
		"nop +1",
		"acc +10",
	}

	res, err := NewAssembler(instructions).Run()

	if err != nil {
		t.Fatalf("Error should not have occurred")
	}

	if res != 17 {
		t.Fatalf("Did not return correct value")
	}

}
