package solutions.day05;

import lombok.Value;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.lang.Math.abs;
import static java.lang.Math.max;
import static java.lang.Math.pow;
import static java.lang.Math.sqrt;

@Value
public class Line {

    Point a;
    Point b;

    double intercept;
    double gradient;

    public Line(Point a, Point b) {
        this.a = a;
        this.b = b;

        this.gradient = deltaY()/deltaX();
        this.intercept =  a.getY() - (a.getX() * this.gradient);
    }

    public boolean isDiagonal() {
        return a.getX() != b.getX() && a.getY() != b.getY();
    }

    private double deltaX() {
        return b.getX() - a.getX();
    }

    private double deltaY() {
        return b.getY() - a.getY();
    }

    private double length() {
        return isDiagonal()
                ? sqrt(pow(deltaX(), 2) * pow(deltaY(), 2))
                : max(abs(deltaX()), abs(deltaY()));
    }

    private boolean isVertical() {
        return b.getX() == a.getX();
    }

    private boolean isHorizontal() {
        return b.getY() == a.getY();
    }

    public List<Point> getAllPointsBetween() {

        if (isVertical()) {
            return rangeInclusive(a.getY(), b.getY()).stream().map(y -> new Point(a.getX(), y)).collect(Collectors.toList());
        }

        if (isHorizontal()) {
            return rangeInclusive(a.getX(), b.getX()).stream().map(x -> new Point(x, a.getY())).collect(Collectors.toList());
        }

        final List<Point> points = new ArrayList<>();

        final List<Integer> yCoords = rangeInclusive(a.getY(), b.getY());
        final List<Integer> xCoords = rangeInclusive(a.getX(), b.getX());

        for (int i = 0; i < yCoords.size(); i++) {
            points.add(new Point(xCoords.get(i), yCoords.get(i)));
        }

        return points;

//        for (double x = a.getX(); x != b.getX(); x += xIncrement) {
//            if (x % 1 == 0) {
//                if (!isVertical()) {
//                    points.add(new Point((int) x, (int) (gradient *x + intercept)));
//                } else {
//
//                }
//            }
//        }
//
//        points.add(b);
    }

    private List<Integer> rangeInclusive(int from, int to) {
        List<Integer> range = new ArrayList<>();
        int inc = to > from ? 1 : -1;
        for (int i = from; i != to; i += inc) {
            range.add(i);
        }
        range.add(to);
        return range;
    }


}
