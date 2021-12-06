package solutions.day06;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Day06 extends BaseDay {

    public Day06(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return String.valueOf(simulate(getInputAsList().get(0), 80).size());
    }

    public List<LanternFish> simulate(final String input, final int numberOfDays) {

        final List<LanternFish> fishes = Arrays.stream(input.split(","))
                .map(Integer::parseInt)
                .map(LanternFish::new)
                .collect(Collectors.toList());

//        System.out.println("Initial state: " + asString(fishes));

        for (int day = 1; day <= numberOfDays; day++) {
            final List<LanternFish> toAdd = new ArrayList<>();
            for (LanternFish fish : fishes) {
                if (fish.simulateDay()) {
                    toAdd.add(LanternFish.createBaby());
                }
            }
            fishes.addAll(toAdd);
//            System.out.println("After  " + day + " day(s): " + asString(fishes));
        }

        return fishes;

    }

    private static String asString(List<LanternFish> fish) {
        return fish.stream().map(LanternFish::toString).collect(Collectors.joining(","));
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
