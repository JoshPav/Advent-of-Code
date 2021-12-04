package solutions.day04;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BingoNumber {

    private final int number;
    private boolean marked = false;

    public void mark() {
        marked = true;
    }
}
