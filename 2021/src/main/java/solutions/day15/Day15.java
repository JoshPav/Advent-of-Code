package solutions.day15;

import shared.ListUtils;
import shared.TwoDimensionalArray;
import solutions.BaseDay;

import java.time.Instant;
import java.util.List;
import java.util.function.Supplier;

public class Day15 extends BaseDay {

    public Day15(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return solveForCaveScale(1);
    }


    @Override
    public String solvePartTwo() {
        return solveForCaveScale(5);
    }

    private String solveForCaveScale(final int cavernScale) {
        TwoDimensionalArray<Chiton> cavern = getCavern(cavernScale);
        var goal = cavern.get(cavern.rowCount()  - 1, cavern.columnCount() - 1);
        return String.valueOf(DijkstraPathFinder.getTotalDistance(cavern.getAllData(), goal));
    }

    private TwoDimensionalArray<Chiton> getCavern(final Integer cavernScale) {

        var input = getInputAsList().stream().map(ListUtils::parseDigits).toList();
        var cavernSize = input.size() * cavernScale;

        TwoDimensionalArray<Chiton> cavern = new TwoDimensionalArray<>(Chiton.class, cavernSize, cavernSize);

        for (int i = 0; i < cavernSize; i++) {
            for (int j = 0; j < cavernSize; j++) {
                cavern.set(i, j, new Chiton(getDistance(input, i, j), getNeighbourSupplier(cavern, i, j)));
            }
        }

        return cavern;
    }

    private Supplier<List<Chiton>> getNeighbourSupplier(TwoDimensionalArray<Chiton> cavern, int i, int j) {
        return () -> cavern.getHorizontalAdjacent(i, j);
    }

    private int getDistance(final List<List<Integer>> input, int i, int j) {
        int caveWidth = input.get(0).size();

        var val = input.get(i % caveWidth).get(j % caveWidth) + (i / caveWidth + j / caveWidth);

        return val > 9 ? val - 9 : val;
    }

}
