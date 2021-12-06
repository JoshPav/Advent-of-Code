package solutions.day06;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
public class LanternFish {

    private int daysToReproduce;

    public static LanternFish createBaby() {
        return new LanternFish(8);
    }

    public boolean simulateDay() {
        if (--daysToReproduce < 0) {
            daysToReproduce = 6;
            return true;
        }
        return false;
    }

    public List<Integer> computeFishForDays(final int daysToSimulate) {
        List<Integer> daysCreated = new ArrayList<>();
        for (int i = daysToSimulate; i > 0; i--) {
            if (simulateDay()) {
                daysCreated.add(i);
            }
        }
        daysCreated.addAll(daysCreated.stream()
                .flatMap(days -> LanternFish.createBaby().computeFishForDays(days).stream())
                .collect(Collectors.toList()));

        return daysCreated;
    }

    public double computeFishForDays2(final int daysToSimulate) {

        double total = 0;

        for (int daysLeft = daysToSimulate; daysLeft > 0; --daysLeft) {
            if (simulateDay()) {
                total += LanternFish.createBaby().computeFishForDays2(daysLeft) + 1;
            }
        }

        return total;
    }

    @Override
    public String toString() {
        return String.valueOf(daysToReproduce);
    }
}
