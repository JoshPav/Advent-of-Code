package solutions.day17;

import shared.math.geometry.Point;
import shared.math.geometry.Vector;
import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.max;
import static java.lang.Math.min;

public class Day17 extends BaseDay {

    public Day17(List<String> input) {
        super(input);
    }

    private record SquareBounds(Point topLeft, Point bottomRight) {}

    @Override
    public String solvePartOne() {

        SquareBounds bounds = getBoundsFromInput();
        List<List<Point>> validTrajectories = new ArrayList<>();

        for (int xVel = 1; xVel < bounds.bottomRight().x(); xVel++) {
            for (int yVel = 500; yVel > bounds.bottomRight().y(); yVel--) {
                Point position = new Point(0, 0);
                Vector velocity = new Vector(xVel ,yVel);
                List<Point> trajectory = new ArrayList<>();
                trajectory.add(position);

                while(!isBeyondBounds(bounds, position)) {

                    // Update
                    position = position.add(velocity);
                    velocity = velocity.add(Double.compare(0, velocity.x()), -1);
                    trajectory.add(position);
                    if (isWithinBounds(bounds, position)) {
                        validTrajectories.add(trajectory);
                        break;
                    }
                }

            }
        }


        return validTrajectories.stream().flatMap(List::stream)
                .map(Point::y)
                .reduce(Double::max)
                .map(Double::intValue)
                .map(String::valueOf)
                .orElseThrow();
    }

    @Override
    public String solvePartTwo() {
        return null;
    }

    private boolean isBeyondBounds(SquareBounds bounds, Point p) {
        return p.x() > bounds.bottomRight.x() || p.y() < bounds.bottomRight.y();
    }

    private boolean isWithinBounds(SquareBounds bounds, Point p) {
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
