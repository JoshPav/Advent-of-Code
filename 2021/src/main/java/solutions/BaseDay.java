package solutions;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class BaseDay implements PuzzleDay {

    private final Stream<String> inputStream;

    protected Stream<String> getInputAsStream() {
        return inputStream;
    }

    protected Stream<Number> getInputAsNumberStream() {
        return getInputAsStream().map(Float::parseFloat);
    }

    protected List<String> getInputAsList() {
        return getInputAsStream().collect(Collectors.toList());
    }

    protected List<Number> getInputAsNumberList() {
        return getInputAsNumberStream().collect(Collectors.toList());
    }

    @Override
    public String getDayNumber() {
        return getClass().getSimpleName().replace("Day", "");
    }
}
