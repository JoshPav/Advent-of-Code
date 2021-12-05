package shared.math.geometry;

public record Point(double x, double y, double z) {

    private static final String SPLIT_REGEX = "\\s?,\\s?";

    public Point() {
        this(0, 0, 0);
    }

    public Point(double x, double y) {
        this(x, y, 0);
    }

    public static void main(String[] args) {
        System.out.println("lol");
    }

    public static Point parse(final String point) {
        String[] split = point.split(SPLIT_REGEX);
        return new Point(
                Double.parseDouble(split[0]),
                Double.parseDouble(split[1]),
                split.length > 2 ? Double.parseDouble(split[2]) : 0
        );
    }

    public Point addX(double toAdd) {
        return new Point(x + toAdd, y, z);
    }

    public Point addY(double toAdd) {
        return new Point(x, y + toAdd, z);
    }

    public Point addZ(double toAdd) {
        return new Point(x, y, z + toAdd);
    }

    public Point add(Vector v) {
        return new Point(x + v.x(), y + v.y(), z + v.z());
    }

}
