package solutions.day05;

import solutions.BaseDay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Day05 extends BaseDay {

    public Day05(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        List<Point> allPoints = getInputAsStream()
                .map(this::parseLine)
                .filter(pair -> !pair.isDiagonal())
                .flatMap(pair -> pair.getAllPointsBetween().stream())
                .collect(Collectors.toList());

        Map<Point, Integer> pointCount = new HashMap<>();
        for (Point p : allPoints) {

            if (!pointCount.containsKey(p)) {
                pointCount.put(p, 0);
            }
            pointCount.put(p, pointCount.get(p) + 1);
        }

        return String.valueOf(pointCount.values().stream().filter(count -> count > 1).count());
    }

    private Line parseLine(final String line) {
        final String[] points = line.split(" -> ");
        return new Line(new Point(points[0]), new Point(points[1]));
    }

    @Override
    public String solvePartTwo() {
        List<Point> allPoints = getInputAsStream()
                .map(this::parseLine)
                .flatMap(pair -> pair.getAllPointsBetween().stream())
                .collect(Collectors.toList());

        Map<Point, Integer> pointCount = new HashMap<>();
        for (Point p : allPoints) {

            if (!pointCount.containsKey(p)) {
                pointCount.put(p, 0);
            }
            pointCount.put(p, pointCount.get(p) + 1);
        }

        return String.valueOf(pointCount.values().stream().filter(count -> count > 1).count());
    }
}
