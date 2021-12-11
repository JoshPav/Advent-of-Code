package solutions.day11;

import shared.ListUtils;
import shared.TwoDimensionalArray;
import solutions.BaseDay;

import java.util.List;

public class Day11 extends BaseDay {

    public Day11(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        var octopuses = createOctopusGrid();

        int totalFlashes = 0;

        for (int i = 0; i < 100; i++) {
            for (var octopus : octopuses) {
                totalFlashes += octopus.incrementEnergyLevel();
            }
            octopuses.stream().forEach(DumboOctopus::resetHasFlashed);
        }

        return String.valueOf(totalFlashes);
    }

    @Override
    public String solvePartTwo() {
        var octopuses = createOctopusGrid();

        int i = 0;
        while(!octopuses.stream().allMatch(DumboOctopus::isFlashed)) {
            octopuses.stream().forEach(DumboOctopus::resetHasFlashed);
            octopuses.stream().forEach(DumboOctopus::incrementEnergyLevel);
            i++;
        }
        return String.valueOf(i);
    }

    private TwoDimensionalArray<DumboOctopus> createOctopusGrid() {
        var octopuses =  new TwoDimensionalArray<>(
                getInputAsStream()
                        .map(ListUtils::parseDigits)
                        .map(list -> list.stream()
                                .map(Integer::shortValue)
                                .map(DumboOctopus::new)
                                .toList()
                        ).toList()
        );
        setNeighbours(octopuses);
        return octopuses;
    }

    private void setNeighbours(TwoDimensionalArray<DumboOctopus> octopuses) {

        for (int i = 0; i < octopuses.rowCount(); i++) {
            for (int j = 0; j < octopuses.columnCount(); j++) {
                octopuses.get(i, j).setNeighbours(octopuses.getAllAdjacent(i, j));
            }
        }

    }
}
