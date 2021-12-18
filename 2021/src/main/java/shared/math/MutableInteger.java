package shared.math;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class MutableInteger {

    private int value = 0;

    public int add(int amount) {
        value += amount;
        return value;
    }

    public int value() {
        return value;
    }

    public void set(int value) {
        this.value = value;
    }


}
