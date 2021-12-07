package solutions.day07;

import solutions.BaseDay;

import java.util.Arrays;
import java.util.List;

import static java.lang.Math.abs;
import static java.util.Arrays.fill;

public class Day07 extends BaseDay {

    public Day07(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        final List<Integer> horiztonalPositions = Arrays.stream(getInputAsList().get(0).split(","))
                .map(Integer::parseInt).toList();

        final int max = horiztonalPositions.stream().max(Integer::compareTo).orElseThrow();

        int[] fuelCost = new int[max + 1];
        fill(fuelCost, 0);

        for (Integer pos: horiztonalPositions) {
            for (int i = 0; i < fuelCost.length; i++) {
                fuelCost[i] += abs(pos - i);
            }
        }

        return String.valueOf(Arrays.stream(fuelCost).min().orElseThrow());
    }

    @Override
    public String solvePartTwo() {

        final List<Integer> horiztonalPositions = Arrays.stream(getInputAsList().get(0).split(","))
                .map(Integer::parseInt).toList();

        final int max = horiztonalPositions.stream().max(Integer::compareTo).orElseThrow();

        int[] fuelCost = new int[max + 1];
        fill(fuelCost, 0);

        for (Integer pos: horiztonalPositions) {
            for (int i = 0; i < fuelCost.length; i++) {
                fuelCost[i] += nthTriangularNumber(abs(pos - i));
            }
        }

        return String.valueOf(Arrays.stream(fuelCost).min().orElseThrow());    }

    private int nthTriangularNumber(int number) {
        return number > 1 ? number + nthTriangularNumber(number - 1) : 1;
    }
}
