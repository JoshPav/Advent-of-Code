package shared.math.geometry;

import lombok.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Value
public class Line {

    Point start;
    Point end;

    Vector vector;

    public Line(Point start, Point end) {
        this.start = start;
        this.end = end;

        this.vector = Vector.fromPoints(start, end);
    }

    public static Line parse(String line, String regex) {
        final String[] points = line.split(regex);
        return new Line(Point.parse(points[0]), Point.parse(points[1]));
    }

    public double deltaX() {
        return end.x() - start.x();
    }

    public double deltaY() {
        return end.y() - start.y();
    }

    public double deltaZ() {
        return end.z() - start.z();
    }

    public boolean isDiagonal() {
        return Stream.of(deltaX(), deltaY(), deltaZ())
                .filter(delta -> delta != 0)
                .count() > 1;
    }

    public List<Point> points() {
        final List<Point> allPoints = new ArrayList<>();

        Point point = start;

        // Add start
        allPoints.add(point);

        final Vector normalised = vector.normalise().intVector();

        while (!point.equals(end)) {
            point = point.add(normalised);
            allPoints.add(point);
        }

        return allPoints;
    }

}
