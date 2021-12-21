package solutions.day18;

import lombok.AllArgsConstructor;

import static java.lang.Math.ceil;
import static java.lang.Math.floor;

@AllArgsConstructor
public class RegularSnailfishNumber extends SnailfishNumber {

    private Integer number;

    @Override
    public Integer magnitude() {
        return number;
    }

    public SnailfishNumberPair asSplitPair() {
        return new SnailfishNumberPair(
                new RegularSnailfishNumber((int) floor(number / 2d)),
                new RegularSnailfishNumber((int) ceil(number / 2d))
        );
    }

}
