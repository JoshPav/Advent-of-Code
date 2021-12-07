package solutions.day06;

import solutions.BaseDay;

import java.util.Arrays;
import java.util.List;

import static java.util.Arrays.fill;

public class Day06 extends BaseDay {

    public Day06(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return getLanternFishCountAfterDays(80);
    }

    @Override
    public String solvePartTwo() {
        return getLanternFishCountAfterDays(256);
    }

    private long[] getInitialState() {
        long[] initialState = new long[9];
        fill(initialState, 0L);

        for (String daysLeft : getFirstLineAsList()) {
            initialState[Short.parseShort(daysLeft)]++;
        }

        return initialState;
    }

    private String getLanternFishCountAfterDays(final int numberOfDays) {

        long[] daysToReproduce = getInitialState();

        for (int day = 1; day <= numberOfDays; day++) {
            final long reproducingFish = daysToReproduce[0];
            System.arraycopy(daysToReproduce, 1, daysToReproduce, 0, daysToReproduce.length - 1);
            daysToReproduce[6] += reproducingFish;
            daysToReproduce[8] = reproducingFish;
        }

        return String.valueOf(Arrays.stream(daysToReproduce).reduce(Long::sum).orElseThrow());

    }
}
