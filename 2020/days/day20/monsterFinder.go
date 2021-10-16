package days

import "fmt"

func countSeaMonstersInOrientation(orientation Tile) int {

	count := 0

	return count
}

func countSeaMonstersInImage(image Tile) int {

	max := 0

	for _, orientation := range image.getAllOrientations() {

		monsters := countSeaMonstersInOrientation(orientation)

		fmt.Printf("Found %v monsters\n", monsters)

		if monsters > max {
			max = monsters
		}
	}

	return max
}

func countHashes(image Tile) int {

	count := 0

	for _, row := range image.image {
		for _, pixel := range row {
			if pixel == '#' {
				count++
			}
		}
	}
	return count
}
