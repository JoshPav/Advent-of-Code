package solutions.day16;

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

    public int postAdd(int amount) {
        int temp = value;
        value += amount;
        return temp;
    }

    public int value() {
        return value;
    }

    public void set(int value) {
        this.value = value;
    }


}
