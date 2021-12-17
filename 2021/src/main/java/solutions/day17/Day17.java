package solutions.day17;

import shared.math.geometry.Point;
import shared.math.geometry.Vector;
import solutions.BaseDay;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.lang.Math.max;
import static java.lang.Math.min;

public class Day17 extends BaseDay {

    public Day17(List<String> input) {
        super(input);
    }

    private record SquareBounds(Point topLeft, Point bottomRight) {
    }

    @Override
    public String solvePartOne() {

        SquareBounds bounds = getBoundsFromInput();
        List<List<Point>> validTrajectories = new ArrayList<>();

        for (int xVel = 1; xVel < bounds.bottomRight().x(); xVel++) {
            for (int yVel = 500; yVel > bounds.bottomRight().y(); yVel--) {
                getTrajectoryIfInBounds(bounds, new Vector(xVel, yVel)).ifPresent(validTrajectories::add);
            }
        }

        return getMaxHeight(validTrajectories);
    }

    private String getMaxHeight(List<List<Point>> trajectories) {
        return trajectories.stream().flatMap(List::stream)
                .map(Point::y)
                .reduce(Double::max)
                .map(Double::intValue)
                .map(String::valueOf)
                .orElseThrow();
    }

    private static Optional<List<Point>> getTrajectoryIfInBounds(SquareBounds bounds, Vector velocity) {
        Point position = new Point(0, 0);
        List<Point> trajectory = new ArrayList<>();
        trajectory.add(position);

        while (!isBeyondBounds(bounds, position)) {

            // Update
            position = position.add(velocity);
            velocity = velocity.add(Double.compare(0, velocity.x()), -1);
            trajectory.add(position);

            if (isWithinBounds(bounds, position)) {
                return Optional.of(trajectory);
            }
        }
        return Optional.empty();
    }

    public static void main(String[] args) {

        // target area: x=20..30, y=-10..-5
        var split = "target area: x=20..30, y=-10..-5".replace("target area: ", "").split(", ");
        var xSplit = split[0].replace("x=", "").split("\\.\\.");
        var ySplit = split[1].replace("y=", "").split("\\.\\.");

        var x1 = Double.parseDouble(xSplit[0]);
        var x2 = Double.parseDouble(xSplit[1]);

        var y1 = Double.parseDouble(ySplit[0]);
        var y2 = Double.parseDouble(ySplit[1]);

        var bounds =  new SquareBounds(
                new Point(min(x1, x2), max(y1, y2)),
                new Point(max(x1, x2), min(y1, y2))
        );

        for (Vector vector : toCheck()) {
            if (getTrajectoryIfInBounds(bounds, vector).isEmpty()) {
                System.out.println(vector);
            }
        }
    }

    private static List<Vector> toCheck() {
        return new ArrayList<>(List.of(
                new Vector(23, -10), new Vector(25, -9), new Vector(27, -5), new Vector(29, -6),
                new Vector(22, -6), new Vector(21, -7), new Vector(9, 0), new Vector(27, -7),
                new Vector(24, -5), new Vector(25, -7), new Vector(26, -6), new Vector(25, -5),
                new Vector(6, 8), new Vector(11, -2), new Vector(20, -5), new Vector(29, -10),
                new Vector(6, 3), new Vector(28, -7), new Vector(8, 0), new Vector(30, -6),
                new Vector(29, -8), new Vector(20, -10), new Vector(6, 7), new Vector(6, 4),
                new Vector(6, 1), new Vector(14, -4), new Vector(21, -6), new Vector(26, -10),
                new Vector(7, -1), new Vector(7, 7), new Vector(8, -1), new Vector(21, -9),
                new Vector(6, 2), new Vector(20, -7), new Vector(30, -10), new Vector(14, -3),
                new Vector(20, -8), new Vector(13, -2), new Vector(7, 3), new Vector(28, -8),
                new Vector(29, -9), new Vector(15, -3), new Vector(22, -5), new Vector(26, -8),
                new Vector(25, -8),
                new Vector(25, -6), new Vector(15, -4), new Vector(9, -2), new Vector(15, -2),
                new Vector(12, -2), new Vector(28, -9), new Vector(12, -3), new Vector(24, -6),
                new Vector(23, -7),
                new Vector(25, -10), new Vector(7, 8), new Vector(11, -3), new Vector(26, -7),
                new Vector(7, 1), new Vector(23, -9), new Vector(6, 0), new Vector(22, -10),
                new Vector(27, -6),
                new Vector(8, 1), new Vector(22, -8), new Vector(13, -4), new Vector(7, 6),
                new Vector(28, -6), new Vector(11, -4), new Vector(12, -4), new Vector(26, -9),
                new Vector(7, 4),
                new Vector(24, -10), new Vector(23, -8), new Vector(30, -8), new Vector(7, 0),
                new Vector(9, -1), new Vector(10, -1), new Vector(26, -5), new Vector(22, -9),
                new Vector(6, 5),
                new Vector(7, 5), new Vector(23, -6), new Vector(28, -10), new Vector(10, -2),
                new Vector(11, -1), new Vector(20, -9), new Vector(14, -2), new Vector(29, -7),
                new Vector(13, -3),
                new Vector(23, -5), new Vector(24, -8), new Vector(27, -9), new Vector(30, -7),
                new Vector(28, -5), new Vector(21, -10), new Vector(7, 9), new Vector(6, 6),
                new Vector(21, -5),
                new Vector(27, -10), new Vector(7, 2), new Vector(30, -9), new Vector(21, -8),
                new Vector(22, -7), new Vector(24, -9), new Vector(20, -6), new Vector(6, 9),
                new Vector(29, -5),
                new Vector(8, -2), new Vector(27, -8), new Vector(30, -5), new Vector(24, -7)
        ));
    }

    @Override
    public String solvePartTwo() {

        SquareBounds bounds = getBoundsFromInput();
        List<List<Point>> validTrajectories = new ArrayList<>();

        var allValid = toCheck();

        for (int xVel = 1; xVel <= bounds.bottomRight().x(); xVel++) {
            for (int yVel = 1000; yVel > -1000; yVel--) {
                var vec = new Vector(xVel, yVel);
                allValid.remove(vec);
                getTrajectoryIfInBounds(bounds, new Vector(xVel, yVel)).ifPresent(validTrajectories::add);
            }
        }

        return String.valueOf(validTrajectories.size());
    }

    private static boolean isBeyondBounds(SquareBounds bounds, Point p) {
        return p.x() > bounds.bottomRight.x() || p.y() < bounds.bottomRight.y();
    }

    private static boolean isWithinBounds(SquareBounds bounds, Point p) {
        return p.x() >= bounds.topLeft.x() && p.y() <= bounds.topLeft.y()
                && p.x() <= bounds.bottomRight.x() && p.y() >= bounds.bottomRight().y();
    }

    private SquareBounds getBoundsFromInput() {
        // target area: x=20..30, y=-10..-5
        var split = getFirstLine().replace("target area: ", "").split(", ");
        var xSplit = split[0].replace("x=", "").split("\\.\\.");
        var ySplit = split[1].replace("y=", "").split("\\.\\.");

        var x1 = Double.parseDouble(xSplit[0]);
        var x2 = Double.parseDouble(xSplit[1]);

        var y1 = Double.parseDouble(ySplit[0]);
        var y2 = Double.parseDouble(ySplit[1]);

        return new SquareBounds(
                new Point(min(x1, x2), max(y1, y2)),
                new Point(max(x1, x2), min(y1, y2))
        );
    }
}
