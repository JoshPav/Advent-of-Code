package solutions.day13;

import lombok.Value;
import shared.math.geometry.Point;

import java.util.function.Function;

@Value
public class FoldInstruction {

    int foldLine;
    Function<Point, Double> pointGetter;
    Function<Point, Point> reflectionFunction;

    public FoldInstruction(final String instruction) {
        var split = instruction.replace("fold along ", "").split("=");

        foldLine = Integer.parseInt(split[1]);

        if (split[0].equals("x")) {
            pointGetter = Point::x;
            reflectionFunction = p -> p.flipX(foldLine);
        } else {
            pointGetter = Point::y;
            reflectionFunction = p -> p.flipY(foldLine);
        }
    }

    public Point fold(final Point p) {
        return pointGetter.apply(p) > foldLine ? reflectionFunction.apply(p) : p;
    }

}
