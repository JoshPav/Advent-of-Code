package solutions.day17;

import shared.math.geometry.Point;
import shared.math.geometry.Vector;
import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;

import static java.lang.Math.max;
import static java.lang.Math.min;

public class Day17 extends BaseDay {

    public Day17(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return getMaxHeight(getAllValidTrajectories());
    }

    @Override
    public String solvePartTwo() {
        return String.valueOf(getAllValidTrajectories().size());
    }

    private List<List<Point>> getAllValidTrajectories() {
        SquareBounds bounds = getBoundsFromInput();
        List<List<Point>> validTrajectories = new ArrayList<>();

        for (int xVel = 1; xVel <= bounds.rightBound(); xVel++) {
            for (int yVel = 1000; yVel > -1000; yVel--) {
                getTrajectoryIfInBounds(bounds, new Vector(xVel, yVel)).ifPresent(validTrajectories::add);
            }
        }

        return validTrajectories;
    }

    private int minVelocity(double distance) {
        // 30 away
        // 30 = vel + (vel - 1) + (vel - 2) + (vel - 3)

        // 30 / vel > 0
        // 30 / 7 = 5
        // 30 / 6 = 5
        // 30 / 5 = 6
        return 1;
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

        while (!bounds.pointBeyond(position)) {

            // Update
            position = position.add(velocity);
            velocity = velocity.add(Double.compare(0, velocity.x()), -1);
            trajectory.add(position);

            if (bounds.pointWithin(position)) {
                return Optional.of(trajectory);
            }
        }
        return Optional.empty();
    }

    private SquareBounds getBoundsFromInput() {
        var bounds = Pattern.compile("(-?[0-9]+)")
                .matcher(getFirstLine())
                .results()
                .map(MatchResult::group)
                .map(Integer::parseInt)
                .toList();
        return new SquareBounds(
                new Point(min(bounds.get(0), bounds.get(1)), max(bounds.get(2), bounds.get(3))),
                new Point(max(bounds.get(0), bounds.get(1)), min(bounds.get(2), bounds.get(3)))
        );
    }
}
