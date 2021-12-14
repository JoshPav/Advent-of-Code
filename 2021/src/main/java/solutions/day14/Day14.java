package solutions.day14;

import solutions.BaseDay;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static shared.ListUtils.first;
import static shared.ListUtils.last;

public class Day14 extends BaseDay {

    public Day14(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        var input = getInputAsList();

        String polymer = input.get(0);
        Map<String, String> polymerRules = input.subList(2, input.size()).stream()
                .map(str -> str.split(" -> "))
                .collect(Collectors.toMap(split -> split[0], split -> split[1]));

        for (int i = 0; i < 10; i++) {
            StringBuilder newPolymer = new StringBuilder();

            for (int j = 0; j < polymer.length() - 1; j++) {
                newPolymer.append(polymer.charAt(j));
                newPolymer.append(polymerRules.get(polymer.substring(j, j+2)));
            }

            newPolymer.append(polymer.charAt(polymer.length() - 1));

            polymer = newPolymer.toString();

        }

        var sorted = polymer.chars()
                .mapToObj(i -> (char) i)
                .collect(Collectors.groupingBy(c -> c))
                .values().stream()
                .map(List::size)
                .sorted()
                .toList();

        return String.valueOf(last(sorted) - first(sorted));
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
