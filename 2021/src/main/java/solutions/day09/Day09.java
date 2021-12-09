package solutions.day09;

import shared.TwoDimensionalArray;
import solutions.BaseDay;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.lang.Math.abs;
import static java.util.Arrays.fill;

public class Day09 extends BaseDay {

    public Day09(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return findLowPoints(getHeightMap())
                .stream()
                .map(this::getRiskLevel)
                .reduce(Integer::sum)
                .map(String::valueOf)
                .orElseThrow();
    }

    @Override
    public String solvePartTwo() {
        return getBasinSizes(getHeightMap())
                .stream().sorted(Comparator.reverseOrder())
                .toList()
                .subList(0, 3)
                .stream()
                .reduce((a, b) -> a * b)
                .map(String::valueOf)
                .orElseThrow();
    }

    private TwoDimensionalArray<Integer> getHeightMap() {
        return new TwoDimensionalArray<>(to2dList(getInputAsList()));
    }

    private List<Integer> getBasinSizes(final TwoDimensionalArray<Integer> heightMap) {

        var alreadyComputed = new TwoDimensionalArray<>(heightMap.rowCount(), heightMap.columnCount(), false);

        final List<Integer> basinSizes = new ArrayList<>();

        for (int i = 0; i < heightMap.rowCount() - 1; i++) {
            for (int j = 0; j < heightMap.columnCount() - 1; j++) {
                if (!alreadyComputed.get(i, j)) {
                    basinSizes.add(getBasinPoints(heightMap, i, j, alreadyComputed));
                }
            }
        }

        return basinSizes;
    }

    private List<Integer> findLowPoints(List<Integer> heightMap, final Integer tubeSize) {
        final List<Integer> lowPoints = new ArrayList<>();
        for (int i = 0; i < heightMap.size() - 1; i++) {

            if (lessThan(i, i - 1, heightMap) && lessThan(i, i + 1, heightMap) &&
                    lessThan(i, i - tubeSize, heightMap) && lessThan(i, i + tubeSize, heightMap)) {
                lowPoints.add(heightMap.get(i));
            }
        }
        return lowPoints;
    }

    private List<Integer> findLowPoints(TwoDimensionalArray<Integer> heightMap) {
        final List<Integer> lowPoints = new ArrayList<>();

        for (int i = 0; i < heightMap.rowCount(); i++) {
            for (int j = 0; j < heightMap.columnCount(); j++) {
                final int height = heightMap.get(i, j);
                if (heightMap.getAdjacent(i, j).stream().allMatch(adjHeight -> adjHeight > height)) {
                    lowPoints.add(height);
                }
            }
        }

        return lowPoints;
    }

    private List<List<Integer>> to2dList(final List<String> input) {
        return input.stream().map(this::asIntegerList).toList();
    }

    private Integer getBasinPoints(TwoDimensionalArray<Integer> heightMap, int i, int j, final TwoDimensionalArray<Boolean> computedIndices) {
        int adjacentCount = 0;

        if (heightMap.exists(i, j) && !computedIndices.get(i, j)) {
            computedIndices.set(i, j, true);
            if (!(heightMap.get(i, j) == 9)) {
                adjacentCount += 1;
                adjacentCount += getBasinPoints(heightMap, i - 1, j, computedIndices);
                adjacentCount += getBasinPoints(heightMap, i + 1, j, computedIndices);
                adjacentCount += getBasinPoints(heightMap, i, j - 1, computedIndices);
                adjacentCount += getBasinPoints(heightMap, i, j + 1, computedIndices);
            }

        }

        return adjacentCount;
    }

    private boolean lessThan(final int valIndex, final int toCheckIndex, final List<Integer> ints) {
        if (toCheckIndex < 0 || toCheckIndex >= ints.size())
            return true;
        return ints.get(valIndex) < ints.get(toCheckIndex);
    }

    private Integer getRiskLevel(final Integer height) {
        return height + 1;
    }

    private List<Integer> asIntegerList(String str) {
        return str.chars().mapToObj(Character::getNumericValue).toList();
    }

}
