package solutions;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor(access = AccessLevel.PUBLIC)
public abstract class BaseDay implements PuzzleDay {

    private final List<String> input;

    protected Stream<String> getInputAsStream() {
        return input.stream();
    }

    protected Stream<Number> getInputAsNumberStream() {
        return getInputAsStream().map(Float::parseFloat);
    }

    protected List<String> getInputAsList() {
        return getInputAsStream().collect(Collectors.toList());
    }

    protected List<Integer> getInputAsIntegerList() {
        return getInputAsNumberStream().map(Number::intValue).collect(Collectors.toList());
    }

    @Override
    public String getDayNumber() {
        return getClass().getSimpleName().replace("Day", "");
    }
}
