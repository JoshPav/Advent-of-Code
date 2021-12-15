package solutions.day15;

import shared.TwoDimensionalArray;
import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;

public class Day15 extends BaseDay {

    public Day15(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        TwoDimensionalArray<Chiton> chitons = new TwoDimensionalArray<>(parseInput(getInputAsList()));
        chitons.forEach(chiton -> chiton.setMap(() -> chitons));
        var goal = chitons.get(chitons.rowCount()  - 1, chitons.columnCount() - 1);

        return String.valueOf(DijkstraPathFinder.getTotalDistance(chitons.getAllData(), goal));
    }


    @Override
    public String solvePartTwo() {

        TwoDimensionalArray<Chiton> chitons = new TwoDimensionalArray<>(getInputPart2());

        chitons.forEach(chiton -> chiton.setMap(() -> chitons));
        var goal = chitons.get(chitons.rowCount()  - 1, chitons.columnCount() - 1);
        return String.valueOf(DijkstraPathFinder.getTotalDistance(chitons.getAllData(), goal));
    }

    private List<List<Chiton>> parseInput(final List<String> input) {
        List<List<Chiton>> pathPoints = new ArrayList<>();
        for (int i = 0; i < input.size(); i++) {
            final String rowData = input.get(i);
            final List<Chiton> row = new ArrayList<>();
            for (int j = 0; j < rowData.length(); j++) {
                    row.add(new Chiton(i, j, Character.getNumericValue(rowData.charAt(j))));
            }
            pathPoints.add(row);
        }
        return pathPoints;

    }


    private List<List<Chiton>> getInputPart2() {

        List<List<Integer>> grid = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            grid.addAll(getFullRow(i));
        }

        List<List<Chiton>> pathPoints = new ArrayList<>();
        for (int i = 0; i < grid.size(); i++) {
            final List<Integer> rowData = grid.get(i);
            final List<Chiton> row = new ArrayList<>();
            for (int j = 0; j < rowData.size(); j++) {
                row.add(new Chiton(i, j, rowData.get(j)));
            }
            pathPoints.add(row);
        }

        return pathPoints;
    }

    private List<List<Integer>> getFullRow(final int increase) {

        var input = getInputAsList();
        List<List<Integer>> tile = new ArrayList<>();
        for (String row : input) {
            List<Integer> mappedRow = new ArrayList<>();
            for (int j = 0; j < 5; j++) {
                int finalJ = j;
                mappedRow.addAll(row.chars()
                        .mapToObj(Character::getNumericValue)
                        .map(num -> {
                            var updated = (num + increase + finalJ);
                            return updated > 9 ? updated - 9 : updated;
                        })
                        .toList()
                );
            }
            tile.add(mappedRow);

        }
        return tile;
    }

}
