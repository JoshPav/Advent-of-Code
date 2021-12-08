package solutions.day08;

import solutions.BaseDay;

import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.groupingBy;

public class Day08 extends BaseDay {

    public Day08(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        var uniqueValues = getInputAsStream()
                .map(line -> line.split("\\|")[1])
                .flatMap(output -> Arrays.stream(output.split("\\s+")))
                .collect(groupingBy(String::length));

        return String.valueOf(uniqueValues.get(2).size() + uniqueValues.get(3).size() + uniqueValues.get(4).size() + uniqueValues.get(7).size());
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
