package solutions.day1;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;

public class Day1 extends BaseDay {

    public Day1(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return getDepthIncreasesForWindowSize(1).toString();
    }

    @Override
    public String solvePartTwo() {
        return getDepthIncreasesForWindowSize(3).toString();
    }

    private Long getDepthIncreasesForWindowSize(final int windowSize) {
        return getIncreaseCount(getDifferencesForWindowSize(getInputAsIntegerList(), windowSize));
    }

    private List<Integer> getDifferencesForWindowSize(final List<Integer> nums, final int windowSize) {
        final List<Integer> differences = new ArrayList<>();
        for (int i = 1; i < nums.size() - (windowSize - 1); i++) {
            differences.add(getTotalForWindow(i, nums, windowSize) - getTotalForWindow(i - 1, nums, windowSize));
        }
        return differences;
    }

    private Long getIncreaseCount(final List<Integer> differences) {
        return differences
                .stream()
                .filter(depth -> depth > 0)
                .count();
    }

    private Integer getTotalForWindow(final int index, final List<Integer> depths, final int windowSize) {
        return depths.subList(index, index + windowSize)
                .stream()
                .reduce(Integer::sum)
                .orElse(0);
    }

}
