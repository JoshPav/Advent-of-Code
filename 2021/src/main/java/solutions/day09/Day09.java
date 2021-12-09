package solutions.day09;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.lang.Math.abs;
import static java.util.Arrays.fill;

public class Day09 extends BaseDay {

    public Day09(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        final Integer tubeSize = getInputAsList().get(0).length();
        final List<Integer> heights = getInputAsStream()
                .flatMap(line -> asIntegerList(line).stream())
                .toList();

        return findLowPoints(heights, tubeSize)
                .stream()
                .map(this::getRiskLevel)
                .reduce(Integer::sum)
                .map(String::valueOf)
                .orElseThrow();
    }

    @Override
    public String solvePartTwo() {
//        final Integer tubeSize = getInputAsList().get(0).length();
//        final List<Integer> heights = getInputAsStream()
//                .flatMap(line -> asIntegerList(line).stream())
//                .toList();
//
//        final var foo = getAdjacentLowPoints(heights, tubeSize)
//                .stream()
//                .sorted(Comparator.comparing(List::size, Comparator.reverseOrder()))
//                .toList();
//
//        final List<Integer> sorted = getAdjacentLowPoints(heights, tubeSize)
//                .stream()
//                .sorted(Comparator.comparing(List::size, Comparator.reverseOrder()))
//                .map(List::size)
//                .sorted()
//                .toList();

        final boolean[][] computed = createARray(getInputAsList().size(), getInputAsList().get(0).length());
        final List<List<Integer>> heightMap = parseHeightMap(getInputAsList());

        final List<Integer> totals = new ArrayList<>();

        for (int i = 0; i < heightMap.size() - 1; i++) {
            for (int j = 0; j < heightMap.get(0).size(); j++) {
                if (!computed[i][j]) {
                    final Integer count = getBasinPoints2(heightMap, i, j, computed);
                    if (count != 0)
                        totals.add(count);
                }

            }
        }


        var sorted = totals.stream().sorted().toList();
        var size = sorted.size();
        return String.valueOf(sorted.get(size - 1) * sorted.get(size - 2) * sorted.get(size - 3));
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

    private boolean[][] createARray(final int iSize, int jSize) {

        final var arr = new boolean[iSize][];

        for (int i = 0; i < iSize; i++) {
            var arr2 = new boolean[jSize];
            fill(arr2, false);

            arr[i] = arr2;
        }

        return arr;
    }

    private List<List<Integer>> parseHeightMap(final List<String> input) {
        return input.stream().map(this::asIntegerList).toList();
    }

    private <T> boolean doesNotExist(List<T> list, int index) {
        return index < 0 || index >= list.size();
    }

    private Integer getBasinPoints2(List<List<Integer>> heightMap, int i, int j, final boolean[][] computedIndices) {

        if (doesNotExist(heightMap, i) || doesNotExist(heightMap.get(i), j) || computedIndices[i][j]) {
            return 0;
        }

        if (heightMap.get(i).get(j) == 9) {
            computedIndices[i][j] = true;
            return 0;
        }
        int total = 0;
        computedIndices[i][j] = true;

        total += getBasinPoints2(heightMap, i - 1, j, computedIndices);
        total += getBasinPoints2(heightMap, i + 1, j, computedIndices);
        total += getBasinPoints2(heightMap, i, j - 1, computedIndices);
        total += getBasinPoints2(heightMap, i, j + 1, computedIndices);

        return total + 1;

    }

    private boolean lessThan(final int valIndex, final int toCheckIndex, final List<Integer> ints) {
        if (toCheckIndex < 0 || toCheckIndex >= ints.size())
            return true;
        return ints.get(valIndex) < ints.get(toCheckIndex);
    }

    private boolean diffOfOne(final int valIndex, final int toCheckIndex, final List<Integer> ints) {
        if (toCheckIndex < 0 || toCheckIndex >= ints.size())
            return false;
        return abs(ints.get(valIndex) - ints.get(toCheckIndex)) == 1;
    }

    private Integer getRiskLevel(final Integer height) {
        return height + 1;
    }

    private List<Integer> asIntegerList(String str) {
        return str.chars().mapToObj(Character::getNumericValue).toList();
    }

}
