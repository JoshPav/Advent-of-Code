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
        return String.valueOf(simulate(getInputAsList().get(0), 80));
    }

    public Long simulate(final String input, final int numberOfDays) {

        Long[] daysToReproduce = new Long[]{0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L, 0L};

        for (String daysLeft : input.split(",")) {
            daysToReproduce[Integer.parseInt(daysLeft)]++;
        }

        for (int day = 1; day <= numberOfDays; day++) {
            Long[] updated = new Long[9];
            System.arraycopy(daysToReproduce, 1, updated, 0, daysToReproduce.length - 1);
            updated[6] += daysToReproduce[0];
            updated[8] = daysToReproduce[0];

            daysToReproduce = updated;
//            final List<LanternFish> toAdd = new ArrayList<>();
//            for (LanternFish fish : fishes) {
//                if (fish.simulateDay()) {
//                    toAdd.add(LanternFish.createBaby());
//                }
//            }
//            fishes.addAll(toAdd);
////            System.out.println("After  " + day + " day(s): " + asString(fishes));
        }

        return Arrays.stream(daysToReproduce).reduce(Long::sum).orElseThrow();

    }

    private static String asString(List<LanternFish> fish) {
        return fish.stream().map(LanternFish::toString).collect(Collectors.joining(","));
    }

    @Override
    public String solvePartTwo() {
//        final List<LanternFish> fishes = Arrays.stream(getInputAsList().get(0).split(","))
//                .map(Integer::parseInt)
//                .map(LanternFish::new)
//                .collect(Collectors.toList());
//
//        Long total = fishes.size();
//
//        for (LanternFish fish : fishes) {
//            total += fish.computeFishForDays2(256);
//        }
        return String.valueOf(simulate(getInputAsList().get(0), 256));
    }
}
