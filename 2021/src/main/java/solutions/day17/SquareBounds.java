package solutions.day17;

import lombok.RequiredArgsConstructor;
import shared.math.geometry.Point;

@RequiredArgsConstructor
public class SquareBounds {

    public final Point topLeft;
    public final Point bottomRight;

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
        return p.x() > bottomRight.x() || p.y() < bottomRight.y();
    }

    public boolean pointWithin(Point p) {
        return p.x() >= topLeft.x() && p.y() <= topLeft.y()
                && p.x() <= bottomRight.x() && p.y() >= bottomRight.y();
    }

//    public boolean pointBeyond(Point p) {
//        return p.x() > rightBound() || p.y() < bottomBound();
//    }
//
//    public boolean pointWithin(Point p) {
//        return p.x() >= leftBound() && p.y() <= topBound()
//                && p.x() <= rightBound() && p.y() >= bottomBound();
//    }

}
