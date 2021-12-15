package solutions.day15;

import shared.ListUtils;
import shared.TwoDimensionalArray;
import solutions.BaseDay;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.function.Predicate.not;
import static shared.ListUtils.first;

public class Day15 extends BaseDay {

    public Day15(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        TwoDimensionalArray<PathPoint> chitons = new TwoDimensionalArray<>(parseInput(getInputAsList()));

        // Dijkstra's algorithm

        // Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
        List<PathPoint> unvisited = new ArrayList<>(chitons.getAllData());

        // Set initial node
        var current = chitons.get(0, 0);
        current.isStart();

        var goal = chitons.get(chitons.rowCount()  - 1, chitons.columnCount() - 1);

        while (!goal.isVisited()) {
//            printTotalRisks(chitons);

            current.setVisited(true);

            PathPoint finalCurrent = current;
            chitons.getHorizontalAdjacent(current.getRow(), current.getCol())
                    .stream().filter(not(PathPoint::isVisited)).forEach(point -> point.checkNeighbour(finalCurrent));

            unvisited.remove(current);
            current = getNextPoint(unvisited);
        }

        return goal.getTotalRiskStr();
    }

    private PathPoint getNextPoint(List<PathPoint> unvisited) {
        return first(unvisited.stream().sorted(Comparator.comparing(PathPoint::getTotalRisk)).toList());
    }

   private void printTotalRisks(TwoDimensionalArray<PathPoint> chitons)  {

       var toPrint = chitons.rows().stream()
               .map(row ->
                       String.format("%3s", row.stream()
                               .map(PathPoint::getTotalRiskStr)
                               .collect(Collectors.joining(" ")))
               ).collect(Collectors.joining("\n"));
       System.out.println("\n\n" + toPrint);
   }

    private List<List<PathPoint>> parseInput(final List<String> input) {
        List<List<PathPoint>> pathPoints = new ArrayList<>();
        for (int i = 0; i < input.size(); i++) {
            final String rowData = input.get(i);
            final List<PathPoint> row = new ArrayList<>();
            for (int j = 0; j < rowData.length(); j++) {
                    row.add(new PathPoint(i, j, Character.getNumericValue(rowData.charAt(j))));
            }
            pathPoints.add(row);
        }
        return pathPoints;

    }

    @Override
    public String solvePartTwo() {

        TwoDimensionalArray<PathPoint> chitons = new TwoDimensionalArray<>(getInputPart2());

        // Dijkstra's algorithm

        // Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
        List<PathPoint> unvisited = new ArrayList<>(chitons.getAllData());

        // Set initial node
        var current = chitons.get(0, 0);
        current.isStart();

        var goal = chitons.get(chitons.rowCount()  - 1, chitons.columnCount() - 1);

        while (!goal.isVisited()) {
//            printTotalRisks(chitons);

            current.setVisited(true);

            PathPoint finalCurrent = current;
            chitons.getHorizontalAdjacent(current.getRow(), current.getCol())
                    .stream().filter(not(PathPoint::isVisited)).forEach(point -> point.checkNeighbour(finalCurrent));

            unvisited.remove(current);
            if (!goal.isVisited()) {
                current = getNextPoint(unvisited);
            }
        }

        return goal.getTotalRiskStr();
    }

    private List<List<PathPoint>> getInputPart2() {

        List<List<Integer>> grid = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            grid.addAll(getFullRow(i));
        }

        List<List<PathPoint>> pathPoints = new ArrayList<>();
        for (int i = 0; i < grid.size(); i++) {
            final List<Integer> rowData = grid.get(i);
            final List<PathPoint> row = new ArrayList<>();
            for (int j = 0; j < rowData.size(); j++) {
                row.add(new PathPoint(i, j, rowData.get(j)));
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
