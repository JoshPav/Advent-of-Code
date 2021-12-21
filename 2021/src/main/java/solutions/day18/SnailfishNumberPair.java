package solutions.day18;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class SnailfishNumberPair extends SnailfishNumber {

    private SnailfishNumber left;
    private SnailfishNumber right;

    public Integer magnitude() {
        return 3 * left.magnitude() + 2 * right.magnitude();
    }

    public boolean reduce() {
        return false;
    }

    private void explode() {

    }

    private void spilt() {

    }

    public SnailfishNumberPair add(SnailfishNumberPair toAdd) {
        return new SnailfishNumberPair(this, toAdd);
    }

}
