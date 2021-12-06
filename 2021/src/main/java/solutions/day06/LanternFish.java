package solutions.day06;

import lombok.AllArgsConstructor;

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

    @Override
    public String toString() {
        return String.valueOf(daysToReproduce);
    }
}
