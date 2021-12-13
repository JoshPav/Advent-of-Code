package solutions.day13;

import shared.math.geometry.Point;
import solutions.BaseDay;

import java.util.List;
import java.util.function.UnaryOperator;

public class Day13 extends BaseDay {

    public Day13(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        var input = getInputAsList();
        final int gap = input.indexOf("");
        List<Point> points = input.subList(0, gap).stream().map(Point::parse).toList();

        List<String> folds = input.subList(gap + 1, input.size())
                .stream().map(str -> str.replace("fold along ", ""))
                .toList();

        var split = folds.get(0).split("=");
        var line = Double.parseDouble(split[1]);
        UnaryOperator<Point> foldFunction = split[0].equals("y")
                ? point -> point.y() > line ? point.flipY(line) : point
                : point -> point.x() > line ? point.flipX(line) : point;

        var folded = points.stream().map(foldFunction).distinct().toList();

        return String.valueOf(folded.size());
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
