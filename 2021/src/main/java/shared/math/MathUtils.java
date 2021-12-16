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

    public static Integer product(Integer a, Integer b) {
        return a * b;
    }

    public static Long product(Long a, Long b) {
        return a * b;
    }

}
