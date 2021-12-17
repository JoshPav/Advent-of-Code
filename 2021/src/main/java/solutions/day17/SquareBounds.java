package solutions.day17;

import lombok.RequiredArgsConstructor;
import shared.math.geometry.Point;

@RequiredArgsConstructor
public class SquareBounds {

    private final Point topLeft;
    private final Point bottomRight;

    public double leftBound() {
        return topLeft.x();
    }

    public double rightBound() {
        return bottomRight.x();
    }

    public double topBound() {
        return topLeft.y();
    }

    public double bottomBound() {
        return bottomRight.y();
    }

    public boolean pointBeyond(Point p) {
        return p.x() > rightBound() || p.y() < bottomBound();
    }

    public boolean pointWithin(Point p) {
        return p.x() >= leftBound() && p.y() <= topBound()
                && p.x() <= rightBound() && p.y() >= bottomBound();
    }

}
