package solutions.day06;

import solutions.BaseDay;

import java.util.Arrays;
import java.util.List;

public class Day06 extends BaseDay {

    public Day06(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return String.valueOf(getLanternFishCountAfterDays(getInputAsList().get(0), 80));
    }

    @Override
    public String solvePartTwo() {
        return String.valueOf(getLanternFishCountAfterDays(getInputAsList().get(0), 256));
    }

    private long[] getInitialState(final String input) {
        long[] initialState = new long[9];
        Arrays.fill(initialState, 0L);

        for (String daysLeft : input.split(",")) {
            initialState[Short.parseShort(daysLeft)]++;
        }

        return initialState;
    }

    private Long getLanternFishCountAfterDays(final String input, final int numberOfDays) {

        long[] daysToReproduce = getInitialState(input);

        for (int day = 1; day <= numberOfDays; day++) {
            final long reproducingFish = daysToReproduce[0];
            System.arraycopy(daysToReproduce, 1, daysToReproduce, 0, daysToReproduce.length - 1);
            daysToReproduce[6] += reproducingFish;
            daysToReproduce[8] = reproducingFish;
        }

        return Arrays.stream(daysToReproduce).reduce(Long::sum).orElseThrow();

    }
}
