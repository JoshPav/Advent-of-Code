package days

import "fmt"

const active = '#'
const inactive = '.'

// For better visualization when printing
const offset = 1

// PocketDimension -
type PocketDimension struct {
	dimension       [][][][]rune
	cyclesProcessed int
}

// NewPocketDimension -
func NewPocketDimension(xLen, yLen, zLen, wLen int) PocketDimension {

	dimension := make([][][][]rune, xLen+offset*2)
	for x := range dimension {
		dimension[x] = make([][][]rune, yLen+offset*2)
		for y := range dimension[x] {
			dimension[x][y] = make([][]rune, zLen+offset*2)
			for z := range dimension[x][y] {
				dimension[x][y][z] = make([]rune, wLen+offset*2)
				for w := range dimension[x][y][z] {
					dimension[x][y][z][w] = inactive
				}
			}
		}
	}

	return PocketDimension{dimension: dimension, cyclesProcessed: 0}
}

func getOffsetCoordinate(coord Coordinate) Coordinate {
	return Coordinate{x: coord.x + offset, y: coord.y + offset, z: coord.z + offset, w: coord.w + offset}
}

// Set - sets the state at a given position
func (pd *PocketDimension) Set(coord Coordinate, state rune) {
	offsetCoordinate := getOffsetCoordinate(coord)
	pd.dimension[offsetCoordinate.x][offsetCoordinate.y][offsetCoordinate.z][offsetCoordinate.w] = state
}

func (pd *PocketDimension) inXDimension(x int) bool {
	return 0 <= x && x < len(pd.dimension)
}

func (pd *PocketDimension) inYDimension(y int) bool {
	return 0 <= y && y < len(pd.dimension[0])
}

func (pd *PocketDimension) inZDimension(z int) bool {
	return 0 <= z && z < len(pd.dimension[0][0])
}

func (pd *PocketDimension) inWDimension(w int) bool {
	return 0 <= w && w < len(pd.dimension[0][0][0])
}

func (pd *PocketDimension) existsInDimension(coord Coordinate) bool {
	return pd.inXDimension(coord.x) && pd.inYDimension(coord.y) && pd.inZDimension(coord.z) && pd.inWDimension(coord.w)
}

// GetCurrentState -
func (pd *PocketDimension) GetCurrentState(coord Coordinate) rune {

	if pd.existsInDimension(coord) {
		return pd.dimension[coord.x][coord.y][coord.z][coord.w]
	}
	return inactive
}

// GetNeighborsWithState -
func (pd *PocketDimension) GetNeighborsWithState(coord Coordinate, desiredState rune) int {

	neighbors := GetNeighborsFromCoordinate(coord)

	count := 0

	for _, neighbor := range neighbors {

		if state := pd.GetCurrentState(neighbor); state == desiredState {
			count++
		}
	}

	return count
}

// GetNewState -
func (pd *PocketDimension) GetNewState(coord Coordinate) rune {

	currentState := pd.GetCurrentState(coord)

	neighborsActive := pd.GetNeighborsWithState(coord, active)

	if currentState == active {
		if neighborsActive == 2 || neighborsActive == 3 {
			return active
		}
		return inactive
	}
	if neighborsActive == 3 {
		return active
	}
	return inactive
}

// ProcessCycle -
func (pd *PocketDimension) ProcessCycle() {

	xDimensionSize := len(pd.dimension)
	yDimensionSize := len(pd.dimension[0])
	zDimensionSize := len(pd.dimension[0][0])
	wDimensionSize := len(pd.dimension[0][0][0])

	// Create expanded PocketDimension
	newDimension := NewPocketDimension(xDimensionSize, yDimensionSize, zDimensionSize, wDimensionSize)

	for x := 0; x < xDimensionSize; x++ {
		for y := 0; y < yDimensionSize; y++ {
			for z := 0; z < zDimensionSize; z++ {
				for w := 0; w < wDimensionSize; w++ {
					coord := Coordinate{x, y, z, w}
					newDimension.Set(coord, pd.GetNewState(coord))
				}
			}
		}
	}

	pd.dimension = newDimension.dimension
	pd.cyclesProcessed++
}

// ProcessNCycles - Process N cycles
func (pd *PocketDimension) ProcessNCycles(n int) {
	for i := 0; i < n; i++ {
		pd.ProcessCycle()
	}
}

func (pd *PocketDimension) getAllCubeCoordinates() []Coordinate {
	allCubeCoordinates := make([]Coordinate, 0)

	for x := 1; x < len(pd.dimension)-1; x++ {
		for y := 1; y < len(pd.dimension[0])-1; y++ {
			for z := 1; z < len(pd.dimension[0][0])-1; z++ {
				for w := 1; w < len(pd.dimension[0][0][0])-1; w++ {
					allCubeCoordinates = append(allCubeCoordinates, Coordinate{x, y, z, w})
				}
			}
		}
	}
	return allCubeCoordinates
}

// GetActiveCount -
func (pd *PocketDimension) GetActiveCount() int {

	activeCount := 0

	for _, coordinate := range pd.getAllCubeCoordinates() {
		if pd.GetCurrentState(coordinate) == active {
			activeCount++
		}
	}

	return activeCount
}

// Print - Prints a 2d representation of the PocketDimension
func (pd *PocketDimension) Print() {

	fmt.Print("==========\n", "Cycle: ", pd.cyclesProcessed, "\n")

	for z := 0; z < len(pd.dimension[0][0]); z++ {

		fmt.Print("Z:", z, "\n\n")
		for y := 0; y < len(pd.dimension[0]); y++ {
			for x := 0; x < len(pd.dimension); x++ {
				fmt.Print(string(pd.dimension[x][y][z]))
			}
			fmt.Print("\n")
		}
		fmt.Print("\n---------\n")

	}

}
