package solutions.day13;

import shared.TwoDimensionalArray;
import shared.math.geometry.Point;

import java.util.ArrayDeque;
import java.util.List;
import java.util.Queue;
import java.util.stream.Collectors;

import static java.lang.Math.max;

public class ThermalManualInstructions {

    private List<Point> plottedDots;
    private final Queue<FoldInstruction> foldInstructions;

    public ThermalManualInstructions(final List<String> input) {
        final int gap = input.indexOf("");

        plottedDots = input.subList(0, gap).stream().map(Point::parse).toList();
        foldInstructions = input.subList(gap + 1, input.size()).stream().map(FoldInstruction::new)
                .collect(Collectors.toCollection(ArrayDeque::new));
    }

    public void followNextInstruction() {
        var instruction = foldInstructions.remove();
        plottedDots = plottedDots.stream().map(instruction::fold).distinct().toList();
    }

    public void followAllInstructions() {
        while (!foldInstructions.isEmpty()) {
            followNextInstruction();
        }
    }

    public int visibleDots() {
        return plottedDots.size();
    }

    public String readDots() {
        return asGrid(plottedDots).rows().stream()
                .map(row ->
                        row.stream()
                                .map(Object::toString)
                                .collect(Collectors.joining(""))
                ).collect(Collectors.joining("\n"));
    }

    private TwoDimensionalArray<String> asGrid(List<Point> points) {

        double maxX = 0;
        double maxY = 0;

        for (Point p : points) {
            maxX = max(maxX, p.x());
            maxY = max(maxY, p.y());
        }
        TwoDimensionalArray<String> grid = new TwoDimensionalArray<>((int) maxY + 1, (int) maxX + 1, "░");

        for (Point p : points) {
            grid.set((int) p.y(), (int) p.x(), "█");
        }

        return grid;
    }


}
