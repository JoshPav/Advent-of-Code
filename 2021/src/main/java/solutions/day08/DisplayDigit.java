package solutions.day08;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public enum DisplayDigit {

    ZERO("0", 6),
    ONE("1", 2),
    TWO("2", 5),
    THREE("3", 5),
    FOUR("4", 4),
    FIVE("5", 5),
    SIX("6", 6),
    SEVEN("7", 3),
    EIGHT("8", 7),
    NINE("9", 6);

    private final String digit;
    private final int enableSegments;
}
