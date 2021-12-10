package solutions.day10;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.util.Stack;

@Value
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ProcessedLine {

    ChunkEnd firstInvalidChunk;
    Stack<ChunkEnd> missingCharacters;

    public static ProcessedLine createInvalid(final ChunkEnd firstInvalid) {
        return new ProcessedLine(firstInvalid, null);
    }

    public static ProcessedLine createIncomplete(final Stack<ChunkEnd> characters) {
        return new ProcessedLine(null, characters);
    }

    public boolean isInvalid() {
        return firstInvalidChunk != null;
    }

    public boolean isMissingCharacters() {
        return !isInvalid() && !missingCharacters.isEmpty();
    }

}
