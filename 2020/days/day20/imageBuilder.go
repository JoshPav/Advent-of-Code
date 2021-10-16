package days

import (
	"fmt"
	"math"
)

func splitTiles(tiles []Tile) ([]int, []int, []int) {

	cornerTiles := make([]int, 0)
	edgeTiles := make([]int, 0)
	middleTiles := make([]int, 0)

	for _, tile := range tiles {
		count := 0
		for _, otherTile := range tiles {

			if !tile.equals(otherTile) {

				if tile.getNumberOfMachingCombinations(otherTile) > 1 {
					count++
				}

			}
		}

		switch count {
		case 2:
			cornerTiles = append(cornerTiles, tile.id)
		case 3:
			edgeTiles = append(edgeTiles, tile.id)
		case 4:
			middleTiles = append(middleTiles, tile.id)
		}
	}
	return cornerTiles, edgeTiles, middleTiles
}

func printFullLayoutIds(fullLayout [][]Tile) {

	for _, row := range fullLayout {
		for _, tile := range row {
			fmt.Printf("%v\t", tile.id)
		}
		fmt.Println("")
	}

}

func getFullImageLayout(tiles []Tile) [][]Tile {

	fullLayout := createResultArray(tiles)

	cornerTiles, edgeTiles, middleTiles := splitTiles(tiles)

	fillInEdges(&cornerTiles, &edgeTiles, &middleTiles, *tiles[0].cachedOrientations, &fullLayout)

	fillInMiddle(&middleTiles, *tiles[0].cachedOrientations, &fullLayout)

	// printFullLayoutIds(fullLayout)

	return fullLayout
}

func removeBordersFromImage(imageWithBorders [][]Tile) Tile {

	imageDataDimension := 8

	imageData := make([][]rune, len(imageWithBorders)*imageDataDimension)

	for i := 0; i < len(imageWithBorders)*imageDataDimension; i++ {
		imageData[i] = make([]rune, len(imageWithBorders)*imageDataDimension)
	}

	for tileJ, row := range imageWithBorders {

		for tileI, col := range row {
			tileData := col.getImageData()

			for dataJ, dataRow := range tileData {
				for dataI, data := range dataRow {

					j := (tileJ * imageDataDimension) + dataJ
					i := (tileI * imageDataDimension) + dataI

					imageData[j][i] = data
				}
			}

		}
	}

	return Tile{image: imageData}
}

func fillInMiddle(middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	dimension := len(*fullLayout)

	for j := 1; j < dimension-1; j++ {
		for i := 1; i < dimension-1; i++ {
			setMiddleTile(i, j, middleTiles, cachedOrientations, fullLayout)
		}
	}

}

func setMiddleTile(i, j int, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	for _, middleTile := range *middleTiles {
		for _, middleTileOrientation := range cachedOrientations[middleTile] {

			left := (*fullLayout)[j][i-1]
			above := (*fullLayout)[j-1][i]

			if edgeMatches(left.getRightBorder(), middleTileOrientation.getLeftBorder()) && edgeMatches(above.getBottomBorder(), middleTileOrientation.getTopBorder()) {

				// Also Check right if it's present
				right := (*fullLayout)[j][i+1]

				if right.id != 0 && !edgeMatches(right.getLeftBorder(), middleTileOrientation.getRightBorder()) {
					continue
				}

				// Also check bottom if it's present
				below := (*fullLayout)[j+1][i]

				if below.id != 0 && !edgeMatches(below.getTopBorder(), middleTileOrientation.getBottomBorder()) {
					continue
				}

				(*fullLayout)[j][i] = middleTileOrientation
				removeFromSlice(middleTile, middleTiles)
				return
			}
		}
	}

}

func fillInTopRow(edgeTiles, middleTiles *[]int, fullLayout *[][]Tile) {

	dimension := len((*fullLayout))

	middleAmount := dimension - 1
	cachedOrientations := *(*fullLayout)[0][0].cachedOrientations
	for i := 2; i < middleAmount; i++ {

		toMatch := (*fullLayout)[0][i-1]

	edgeTileLoop:
		for _, edgeTile := range *edgeTiles {
			for _, edgeTileOrientation := range cachedOrientations[edgeTile] {

				if edgeMatches(toMatch.getRightBorder(), edgeTileOrientation.getLeftBorder()) {
					valid := true
					// Could be valid, just need to check top border does not match anything
				middleLoop:
					for _, middleTile := range *middleTiles {
						for _, middleOrientation := range cachedOrientations[middleTile] {

							if edgeMatches(edgeTileOrientation.getTopBorder(), middleOrientation.getBottomBorder()) {
								valid = false
								break middleLoop
							}

						}
						if valid {
							(*fullLayout)[0][i] = edgeTileOrientation
							removeFromSlice(edgeTileOrientation.id, edgeTiles)
							break edgeTileLoop
						}
					}

				}

			}
		}

	}
}

func fillInBottomRow(edgeTiles, middleTiles *[]int, fullLayout *[][]Tile) {

	dimension := len((*fullLayout))

	middleAmount := dimension - 1
	cachedOrientations := *(*fullLayout)[0][0].cachedOrientations
	for i := 2; i < middleAmount; i++ {

		toMatch := (*fullLayout)[dimension-1][i-1]

	edgeTileLoop:
		for _, edgeTile := range *edgeTiles {
			for _, edgeTileOrientation := range cachedOrientations[edgeTile] {

				if edgeMatches(toMatch.getRightBorder(), edgeTileOrientation.getLeftBorder()) {
					valid := true
					// Could be valid, just need to check top border does not match anything
				middleLoop:
					for _, middleTile := range *middleTiles {
						for _, middleOrientation := range cachedOrientations[middleTile] {

							if edgeMatches(edgeTileOrientation.getBottomBorder(), middleOrientation.getTopBorder()) {
								valid = false
								break middleLoop
							}

						}
						if valid {
							(*fullLayout)[dimension-1][i] = edgeTileOrientation
							removeFromSlice(edgeTileOrientation.id, edgeTiles)
							break edgeTileLoop
						}
					}

				}

			}
		}

	}
}

func setTopRightTile(cornerTiles, edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	leftAdjacent := (*fullLayout)[0][len((*fullLayout)[0])-2]

	for _, cornerTile := range *cornerTiles {
		for _, cornerTileOrientation := range cachedOrientations[cornerTile] {

			if edgeMatches(cornerTileOrientation.getLeftBorder(), leftAdjacent.getRightBorder()) {

				for _, edgeTile := range *edgeTiles {
					for _, edgeTileOrientation := range cachedOrientations[edgeTile] {

						if edgeMatches(cornerTileOrientation.getBottomBorder(), edgeTileOrientation.getTopBorder()) {
							valid := true
						middleLoop:
							for _, middleTile := range *middleTiles {
								for _, middleTileOrientation := range cachedOrientations[middleTile] {

									if edgeMatches(edgeTileOrientation.getRightBorder(), middleTileOrientation.getLeftBorder()) {
										valid = false
										break middleLoop
									}

								}
							}
							if valid {
								endIndex := len((*fullLayout)[0]) - 1
								(*fullLayout)[0][endIndex] = cornerTileOrientation
								(*fullLayout)[1][endIndex] = edgeTileOrientation
								removeFromSlice(cornerTile, cornerTiles)
								removeFromSlice(edgeTile, edgeTiles)
								return
							}
						}

					}
				}

			}

		}
	}
}

func fillInEdges(cornerTiles, edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	setTopRow(cornerTiles, edgeTiles, middleTiles, cachedOrientations, fullLayout)

	setLeftEdge(edgeTiles, middleTiles, cachedOrientations, fullLayout)

	setRightEdge(edgeTiles, middleTiles, cachedOrientations, fullLayout)

	setBottomRow(cornerTiles, edgeTiles, middleTiles, cachedOrientations, fullLayout)
}

func setLeftEdge(edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	dimension := len((*fullLayout))

	middleAmount := dimension - 1
	for i := 2; i < middleAmount; i++ {

		toMatch := (*fullLayout)[i-1][0]

	edgeTileLoop:
		for _, edgeTile := range *edgeTiles {
			for _, edgeTileOrientation := range cachedOrientations[edgeTile] {

				if edgeMatches(toMatch.getBottomBorder(), edgeTileOrientation.getTopBorder()) {
					valid := true
					// Could be valid, just need to check left border does not match anything
				middleLoop:
					for _, middleTile := range *middleTiles {
						for _, middleOrientation := range cachedOrientations[middleTile] {

							if edgeMatches(edgeTileOrientation.getLeftBorder(), middleOrientation.getRightBorder()) {
								valid = false
								break middleLoop
							}

						}
						if valid {
							(*fullLayout)[i][0] = edgeTileOrientation
							removeFromSlice(edgeTileOrientation.id, edgeTiles)
							break edgeTileLoop
						}
					}

				}

			}
		}

	}

}

func setRightEdge(edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	dimension := len((*fullLayout))

	middleAmount := dimension - 1
	for i := 2; i < middleAmount; i++ {

		toMatch := (*fullLayout)[i-1][dimension-1]

	edgeTileLoop:
		for _, edgeTile := range *edgeTiles {
			for _, edgeTileOrientation := range cachedOrientations[edgeTile] {

				if edgeMatches(toMatch.getBottomBorder(), edgeTileOrientation.getTopBorder()) {
					valid := true
					// Could be valid, just need to check left border does not match anything
				middleLoop:
					for _, middleTile := range *middleTiles {
						for _, middleOrientation := range cachedOrientations[middleTile] {

							if edgeMatches(edgeTileOrientation.getRightBorder(), middleOrientation.getLeftBorder()) {
								valid = false
								break middleLoop
							}

						}
						if valid {
							(*fullLayout)[i][dimension-1] = edgeTileOrientation
							removeFromSlice(edgeTileOrientation.id, edgeTiles)
							break edgeTileLoop
						}
					}

				}

			}
		}

	}

}

func setTopRow(cornerTiles, edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	setTopLeftTile(cornerTiles, edgeTiles, middleTiles, cachedOrientations, fullLayout)

	fillInTopRow(edgeTiles, middleTiles, fullLayout)

	setTopRightTile(cornerTiles, edgeTiles, middleTiles, cachedOrientations, fullLayout)
}

func setBottomRow(cornerTiles, edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	setBottomLeftTile(cornerTiles, edgeTiles, middleTiles, cachedOrientations, fullLayout)

	fillInBottomRow(edgeTiles, middleTiles, fullLayout)

	setBottomRightTile(cornerTiles, cachedOrientations, fullLayout)
}

func setBottomLeftTile(cornerTiles, edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	aboveAdjacent := (*fullLayout)[len((*fullLayout)[0])-2][0]

	for _, cornerTile := range *cornerTiles {
		for _, cornerTileOrientation := range cachedOrientations[cornerTile] {

			if edgeMatches(cornerTileOrientation.getTopBorder(), aboveAdjacent.getBottomBorder()) {

				for _, edgeTile := range *edgeTiles {
					for _, edgeTileOrientation := range cachedOrientations[edgeTile] {

						if edgeMatches(cornerTileOrientation.getRightBorder(), edgeTileOrientation.getLeftBorder()) {
							valid := true
						middleLoop:
							for _, middleTile := range *middleTiles {
								for _, middleTileOrientation := range cachedOrientations[middleTile] {

									if edgeMatches(edgeTileOrientation.getBottomBorder(), middleTileOrientation.getTopBorder()) {
										valid = false
										break middleLoop
									}

								}
							}
							if valid {
								endIndex := len((*fullLayout)) - 1
								(*fullLayout)[endIndex][0] = cornerTileOrientation
								(*fullLayout)[endIndex][1] = edgeTileOrientation
								removeFromSlice(cornerTile, cornerTiles)
								removeFromSlice(edgeTile, edgeTiles)
								return
							}
						}

					}
				}

			}

		}
	}
}

func setBottomRightTile(cornerTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	dimension := len(*fullLayout)

	aboveAdjacent := (*fullLayout)[dimension-2][dimension-1]
	leftAdjacent := (*fullLayout)[dimension-1][dimension-2]

	for _, cornerTile := range *cornerTiles {
		for _, cornerTileOrientation := range cachedOrientations[cornerTile] {

			if edgeMatches(cornerTileOrientation.getTopBorder(), aboveAdjacent.getBottomBorder()) && edgeMatches(cornerTileOrientation.getLeftBorder(), leftAdjacent.getRightBorder()) {

				(*fullLayout)[dimension-1][dimension-1] = cornerTileOrientation
				removeFromSlice(cornerTile, cornerTiles)
				return

			}

		}
	}
}

func setTopLeftTile(cornerTiles, edgeTiles, middleTiles *[]int, cachedOrientations map[int][]Tile, fullLayout *[][]Tile) {

	// Any tile can be a corner tile, lets choose the first one
	cornerTile := (*cornerTiles)[0]

	// Get all orientations for that tile
	cornerTileOrientations := cachedOrientations[cornerTile]

	// Corner tile will have a right match and bottom match
	for _, orientation := range cornerTileOrientations {
		var rightMatch *Tile
		var bottomMatch *Tile

		for _, edgeTile := range *edgeTiles {
		edgeTileLoop:
			for _, edgeTileOrientation := range cachedOrientations[edgeTile] {

				if edgeMatches(orientation.getRightBorder(), edgeTileOrientation.getLeftBorder()) {
					for _, middleTile := range *middleTiles {
						for _, middleTileOrientation := range cachedOrientations[middleTile] {
							if edgeMatches(edgeTileOrientation.getTopBorder(), middleTileOrientation.getBottomBorder()) {
								break edgeTileLoop
							}
						}
					}

					rightMatch = &edgeTileOrientation
					break edgeTileLoop
				}

				if edgeMatches(orientation.getBottomBorder(), edgeTileOrientation.getTopBorder()) {
					for _, middleTile := range *middleTiles {
						for _, middleTileOrientation := range cachedOrientations[middleTile] {
							if edgeMatches(edgeTileOrientation.getLeftBorder(), middleTileOrientation.getRightBorder()) {
								break edgeTileLoop
							}
						}
					}

					bottomMatch = &edgeTileOrientation
					break edgeTileLoop
				}
			}
		}

		if rightMatch != nil && bottomMatch != nil {
			removeFromSlice(orientation.id, cornerTiles)
			removeFromSlice(rightMatch.id, edgeTiles)
			removeFromSlice(bottomMatch.id, edgeTiles)

			(*fullLayout)[0][0] = orientation
			(*fullLayout)[0][1] = *rightMatch
			(*fullLayout)[1][0] = *bottomMatch

		}
	}
}

func removeFromSlice(toRemove int, slice *[]int) {

	newSlice := make([]int, 0)
	for _, v := range *slice {
		if v != toRemove {
			newSlice = append(newSlice, v)
		}
	}
	*slice = newSlice
}

func createResultArray(tiles []Tile) [][]Tile {
	dimensions := int(math.Sqrt(float64(len(tiles))))
	fullLayout := make([][]Tile, dimensions)

	for i := 0; i < dimensions; i++ {
		fullLayout[i] = make([]Tile, dimensions)
	}

	return fullLayout
}
