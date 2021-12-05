package shared.math.geometry;

import static java.lang.Math.pow;
import static java.lang.Math.round;
import static java.lang.Math.sqrt;

public record Vector(double x, double y, double z) {

    public static Vector fromPoints(Point start, Point end) {
        return new Vector(end.x() - start.x(), end.y() - start.y(), end.z() - start.z());
    }

    public Vector normalise() {

        final double magnitude = magnitude();
        return new Vector(x / magnitude, y / magnitude, z / magnitude);
    }

    public Vector intVector() {
        return new Vector(round(x), round(y), round(z));
    }

    public double magnitude() {
        return sqrt(pow(x, 2) + pow(y, 2) + pow(z, 2));
    }

}
