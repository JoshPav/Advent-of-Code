package solutions.day09;

import shared.TwoDimensionalArray;
import shared.math.MathUtils;
import solutions.BaseDay;
import shared.ListUtils;

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
                .reduce(MathUtils::product)
                .map(String::valueOf)
                .orElseThrow();
    }

    private TwoDimensionalArray<Integer> getHeightMap() {
        return new TwoDimensionalArray<>(
                getInputAsStream().map(ListUtils::parseDigits).toList()
        );
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

    private Integer getRiskLevel(final Integer height) {
        return height + 1;
    }

}
