package shared.math;

import java.util.ArrayList;
import java.util.List;

public final class MathUtils {

    public static List<Integer> rangeInclusive(int from, int to) {
        List<Integer> range = new ArrayList<>();
        int inc = to > from ? 1 : -1;
        for (int i = from; i != to; i += inc) {
            range.add(i);
        }
        range.add(to);
        return range;
    }

    public static List<Integer> fill(int toFill, int size) {
        List<Integer> nums = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            nums.add(toFill);
        }
        return nums;
    }

}
