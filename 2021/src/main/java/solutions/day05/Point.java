package solutions.day05;

import lombok.Value;

@Value
public class Point {

    int x;
    int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Point(String coordinate) {
        final String[] split = coordinate.split(",");
        x = Integer.parseInt(split[0]);
        y = Integer.parseInt(split[1]);
    }



}
