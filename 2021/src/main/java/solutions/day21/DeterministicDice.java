package solutions.day21;

import lombok.Getter;
import shared.math.MutableInteger;

class DeterministicDice {

    private final MutableInteger dice = new MutableInteger(0);
    @Getter
    private int timesRolled = 0;

    public int roll(int times) {
        int rollTotal = 0;
        for (int i = 0; i < times; i++) {
            rollTotal += roll();
        }
        return rollTotal;
    }

    public int roll() {
        if (dice.value() == 100) {
            dice.set(0);
        }
        dice.add(1);
        timesRolled++;
        return dice.value();
    }

}
