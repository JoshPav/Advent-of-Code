package solutions.day07;

import solutions.BaseDay;

import java.util.Arrays;
import java.util.List;

import static java.lang.Math.abs;
import static java.lang.Math.pow;
import static java.util.Arrays.fill;

public class Day07 extends BaseDay {

    public Day07(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return calculateLowestTotalFuelCost(toMove -> toMove);
    }

    @Override
    public String solvePartTwo() {
        return calculateLowestTotalFuelCost(this::sumToN);
    }

    private String calculateLowestTotalFuelCost(final CrabEngineFuelAlgorithm algorithm) {
        final List<Integer> horizontalPositions = getFirstLineAsIntegerList();

        final int max = horizontalPositions.stream().max(Integer::compareTo).orElseThrow();

        int[] fuelCost = new int[max + 1];
        fill(fuelCost, 0);

        for (Integer pos: horizontalPositions) {
            for (int i = 0; i < fuelCost.length; i++) {
                fuelCost[i] += algorithm.calculateFuelCost(abs(pos - i));
            }
        }

        return String.valueOf(Arrays.stream(fuelCost).min().orElseThrow());
    }

    private int sumToN(int number) {
        return ((int) pow(number, 2) + number)/2;
    }
}
