package days

import (
	"fmt"
	"strconv"
	"strings"

	"../../shared"
)

// Tile -
type Tile struct {
	id                 int
	image              [][]rune
	cachedOrientations *map[int][]Tile
}

func (t *Tile) addImageData(line string) {
	if t.image == nil {
		t.image = make([][]rune, 0)
	}
	rowData := make([]rune, 0)
	for _, char := range line {
		rowData = append(rowData, rune(char))
	}
	t.image = append(t.image, rowData)
}

func (t *Tile) printTile() {
	fmt.Printf("Tile %v\n", t.id)
	for _, row := range t.image {
		fmt.Println(string(row))
	}
	fmt.Println("")
}

func (t *Tile) printImageData() {
	fmt.Printf("Tile %v\n", t.id)
	for _, row := range t.getImageData() {
		fmt.Println(string(row))
	}
	fmt.Println("")
}

func (t *Tile) getTopBorder() []rune {
	return t.image[0]
}

func (t *Tile) getBottomBorder() []rune {
	return t.image[len(t.image)-1]
}

func (t *Tile) getLeftBorder() []rune {
	leftBorder := make([]rune, 0)
	for _, row := range t.image {
		leftBorder = append(leftBorder, row[0])
	}
	return leftBorder
}

func (t *Tile) getRightBorder() []rune {
	rightBorder := make([]rune, 0)
	for _, row := range t.image {
		rightBorder = append(rightBorder, row[len(row)-1])
	}
	return rightBorder
}

func (t *Tile) getImageData() [][]rune {

	imageData := make([][]rune, 0)

	for i := 1; i < len(t.image)-1; i++ {
		imageData = append(imageData, t.image[i][1:len(t.image[i])-1])
	}
	return imageData
}

func (t *Tile) getAllOrientations() []Tile {
	allOrientations := make([]Tile, 0)

	for _, reflection := range (*t).getAllReflections() {
		allOrientations = append(allOrientations, reflection.getAllRotations()...)
	}

	return getUniqueTiles(allOrientations)
}

func getUniqueTiles(tiles []Tile) []Tile {

	uniqueTiles := make([]Tile, 0)

	for _, tile := range tiles {
		unique := true
		for _, uniqueTile := range uniqueTiles {
			if tile.equals(uniqueTile) {
				unique = false
				break
			}
		}
		if unique {
			uniqueTiles = append(uniqueTiles, tile)
		}
	}
	return uniqueTiles
}

func (t *Tile) equals(other Tile) bool {
	if t.id == other.id {
		for i := 0; i < len(t.image); i++ {
			for j := 0; j < len(other.image[0]); j++ {
				if t.image[i][j] != other.image[i][j] {
					return false
				}
			}
		}
		return true
	}
	return false
}

// Will return 3
func (t *Tile) getAllReflections() []Tile {
	return []Tile{*t, (*t).getFlippedInX(), (*t).getFlippedInY()}
}

// Will return 4
func (t *Tile) getAllRotations() []Tile {
	rotatedTiles := make([]Tile, 0)
	currentTile := *t
	for i := 0; i < 4; i++ {
		currentTile = currentTile.rotateClockwise()
		rotatedTiles = append(rotatedTiles, currentTile)
	}

	return rotatedTiles
}

func (t *Tile) rotateClockwise() Tile {
	rotatedImage := make([][]rune, len(t.image[0]))

	for i := 0; i < len(t.image[0]); i++ {
		rotatedImage[i] = make([]rune, len(t.image))
	}

	cols := len(t.image[0])
	rows := len(t.image)

	for i := 0; i < cols; i++ {
		for j := 0; j < rows; j++ {
			rotatedImage[i][j] = t.image[rows-1-j][i]
		}
	}

	return Tile{t.id, rotatedImage, t.cachedOrientations}
}

func (t *Tile) getNumberOfMachingCombinations(other Tile) int {

	matches := 0
	for _, orientation := range (*t.cachedOrientations)[t.id] {
		for _, otherOrientation := range (*t.cachedOrientations)[other.id] {
			if orientation.tileCanLineUp(otherOrientation) {
				matches++
			}
		}
	}

	return matches
}

func (t *Tile) tileCanLineUp(other Tile) bool {
	return edgeMatches(t.getTopBorder(), other.getBottomBorder()) || edgeMatches(t.getBottomBorder(), other.getTopBorder()) || edgeMatches(t.getRightBorder(), other.getLeftBorder()) || edgeMatches(t.getLeftBorder(), other.getRightBorder())
}

func edgeMatches(edgeA, edgeB []rune) bool {
	for i, v := range edgeA {
		if v != edgeB[i] {
			return false
		}
	}
	return true
}

func (t *Tile) getFlippedInX() Tile {

	newTileData := make([][]rune, len(t.image))

	endIndex := len(t.image) - 1

	for i, row := range t.image {
		newTileData[endIndex-i] = row
	}

	return Tile{t.id, newTileData, t.cachedOrientations}
}

func (t *Tile) getFlippedInY() Tile {

	newTileData := make([][]rune, 0)

	for _, row := range t.image {
		newRowData := make([]rune, 0)
		for i := len(t.image) - 1; i >= 0; i-- {
			newRowData = append(newRowData, row[i])
		}
		newTileData = append(newTileData, newRowData)
	}

	return Tile{t.id, newTileData, t.cachedOrientations}
}

func getTileID(line string) int {
	asInt, _ := strconv.Atoi(strings.ReplaceAll(line[0:len(line)-1], "Tile ", ""))
	return asInt
}

func createTilesFromInput(input shared.Input) []Tile {

	tiles := make([]Tile, 0)

	cachedOrientations := make(map[int][]Tile)

	var newTile Tile

	for i, line := range input {

		if strings.Contains(line, "Tile") {
			newTile = Tile{id: getTileID(line), cachedOrientations: &cachedOrientations}
		} else if line == "" {
			tiles = append(tiles, newTile)
			cachedOrientations[newTile.id] = newTile.getAllOrientations()
		} else {
			newTile.addImageData(line)

			if i == len(input)-1 {
				tiles = append(tiles, newTile)
				cachedOrientations[newTile.id] = newTile.getAllOrientations()
			}
		}
	}

	return tiles
}
