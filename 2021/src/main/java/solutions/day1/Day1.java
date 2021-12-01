package solutions.day1;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Day1 extends BaseDay {

    public Day1(Stream<String> inputStream) {
        super(inputStream);
    }

    @Override
    public String solvePartOne() {
        final List<Integer> depths = getInputAsNumberStream().map(Number::intValue).collect(Collectors.toList());

        final List<Integer> differences = new ArrayList<>();

        for (int i = 1; i < depths.size(); i++) {
            differences.add(depths.get(i) - depths.get(i - 1));
        }

        return getIncreaseCount(differences);
    }

    private String getIncreaseCount(List<Integer> differences) {
        return String.valueOf(differences
                .stream()
                .filter(depth -> depth > 0)
                .count()
        );
    }

    @Override
    public String solvePartTwo() {
        return null;
    }

}
