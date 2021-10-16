package days

import (
	"strconv"

	"../../shared"
)

const tree = "#"

// Day3Computer computes the solutions for day 3
type Day3Computer struct{}

type slopeTraversePattern struct {
	right int
	down  int
}

func solveForPattern(pattern slopeTraversePattern, slopeMap []string) int {

	i := pattern.right
	treeCount := 0

	for j := pattern.down; j < len(slopeMap); j += pattern.down {
		if string(slopeMap[j][i%len(slopeMap[j])]) == tree {
			treeCount++
		}

		i += pattern.right
	}

	return treeCount

}

// Part1 of day 3
func (d *Day3Computer) Part1(input shared.Input) (shared.Result, error) {
	return strconv.Itoa(solveForPattern(slopeTraversePattern{3, 1}, input)), nil
}

// Part2 of day 3
func (d *Day3Computer) Part2(input shared.Input) (shared.Result, error) {

	patterns := []slopeTraversePattern{
		slopeTraversePattern{1, 1},
		slopeTraversePattern{3, 1},
		slopeTraversePattern{5, 1},
		slopeTraversePattern{7, 1},
		slopeTraversePattern{1, 2},
	}

	treesHitProduct := 1

	for _, pattern := range patterns {
		treesHitProduct *= solveForPattern(pattern, input)
	}

	return strconv.Itoa(treesHitProduct), nil
}
