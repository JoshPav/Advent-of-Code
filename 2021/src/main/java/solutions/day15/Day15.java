package solutions.day15;

import shared.TwoDimensionalArray;
import solutions.BaseDay;

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
        return null;
    }
}
