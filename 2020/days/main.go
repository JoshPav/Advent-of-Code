package main

import (
	"fmt"
	"time"

	today "../days/day20"
	shared "../shared"
)

func runForDay(day shared.Day, input shared.Input) {

	start := time.Now()

	ans1, err1 := day.Part1(input)
	fmt.Print("\nQuestion 1: ", ans1, " ", err1, "\n")

	ans2, err2 := day.Part2(input)
	fmt.Println("Question 2:", ans2, err2)

	elapsed := time.Since(start)
	fmt.Printf("\nExecution took %s\n", elapsed)
}

func main() {

	day := 20

	fmt.Print("AoC 2020 Day", day, "\n\n")

	runForDay(&today.Day20Computer{}, shared.Input(shared.ReadStringLines(day)))
}
