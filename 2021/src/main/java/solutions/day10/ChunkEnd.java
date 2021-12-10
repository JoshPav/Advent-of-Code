package solutions.day10;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
enum ChunkEnd {
    ROUND(')', 3, 1),
    SQUARE(']', 57, 2),
    CURLY('}', 1197, 3),
    ANGLE('>', 25137, 4);

    private final char character;
    private final int syntaxPoints;
    private final int autocompletePoints;

    public static ChunkEnd parse(char c) {
        return Arrays.stream(ChunkEnd.values())
                .filter(chunkEnd -> chunkEnd.character == c)
                .findFirst().orElseThrow();
    }
}