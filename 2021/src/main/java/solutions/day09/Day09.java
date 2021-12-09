package solutions.day09;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public String solvePartTwo() {
        return null;
    }
}
