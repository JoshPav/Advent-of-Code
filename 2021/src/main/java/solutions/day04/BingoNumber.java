package solutions.day04;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BingoNumber {

    private final int number;
    private final BingoBoard parent;
    private boolean checked = false;

    public void check() {
        if (!parent.hasWon()) {
            checked = true;
        }
    }
}
