package shared

// The Input used to calculate the Result
type Input = []string

// The Result of the days calculation
type Result = string

// Day - Interface for each day
type Day interface {
	Part1(Input) (Result, error)
	Part2(Input) (Result, error)
}
