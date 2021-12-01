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
        final List<Integer> depths = getInputAsIntegerList();

        final List<Integer> differences = new ArrayList<>();

        for (int i = 1; i < depths.size(); i++) {
            differences.add(depths.get(i) - depths.get(i - 1));
        }

        return getIncreaseCount(differences);
    }

    private String getIncreaseCount(List<Integer> differences) {
        return String.valueOf(differences
                .stream()
                .filter(depth -> depth > 0)
                .count()
        );
    }

    @Override
    public String solvePartTwo() {
        final List<Integer> depths = getInputAsIntegerList();

        final List<Integer> differences = new ArrayList<>();

        final int windowSize = 3;

        for (int i = 1; i < depths.size() - (windowSize - 1); i++) {
            differences.add(getTotalForWindow(i, depths, windowSize) - getTotalForWindow(i - 1, depths, windowSize));
        }

        return getIncreaseCount(differences);
    }

    private Integer getTotalForWindow(int index, final List<Integer> depths, final int windowSize) {

        int sum = 0;

        for (int i = 0; i < windowSize; i++) {
            sum += depths.get(index);
            index++;
        }

        return sum;
    }

}
