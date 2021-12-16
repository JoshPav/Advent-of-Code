package solutions;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
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

    protected List<String> getFirstLineAsList() {
        return getFirstLineAsStream().toList();
    }

    protected List<Integer> getFirstLineAsIntegerList() {
        return getFirstLineAsStream().map(Integer::parseInt).toList();
    }

    protected Stream<String> getFirstLineAsStream() {
        return Arrays.stream(getFirstLine().split(","));
    }

    protected String getFirstLine() {
        return getInputAsList().get(0);
    }

    protected Stream<Integer> getFirstLineAsIntegerStream() {
        return getFirstLineAsIntegerList().stream();
    }

    @Override
    public String getDayNumber() {
        return getClass().getSimpleName().replace("Day", "");
    }
}
