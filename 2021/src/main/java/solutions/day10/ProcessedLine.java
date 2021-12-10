package solutions.day10;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.util.Stack;

@Value
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ProcessedLine {

    Character firstInvalid;
    Stack<Character> missingCharacters;

    public static ProcessedLine createInvalid(final Character firstInvalid) {
        return new ProcessedLine(firstInvalid, null);
    }

    public static ProcessedLine createIncomplete(final Stack<Character> characters) {
        return new ProcessedLine(null, characters);
    }

    public boolean isInvalid() {
        return firstInvalid != null;
    }

    public boolean isMissingCharacters() {
        return !isInvalid() && !missingCharacters.isEmpty();
    }

}
