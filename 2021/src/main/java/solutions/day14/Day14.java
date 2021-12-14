package solutions.day14;

import solutions.BaseDay;

import java.util.HashMap;
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
        return solve(getInputAsList(), 10);
    }

    private String solve(final List<String> input, int steps) {
        String polymer = input.get(0);
        Map<String, String> polymerRules = getInsertionRules(input.subList(2, input.size()));

        var pairCounts = toPairMap(polymer);

        for (int i = 0; i < steps; i++) {
            pairCounts = step(pairCounts, polymerRules);
        }

        Map<Character, Long> counts = new HashMap<>();
        for (var entry : pairCounts.entrySet()) {
            var c = entry.getKey().charAt(0);
            counts.put(c, entry.getValue() + counts.getOrDefault(c, 0L));
        }

        // Add final letter back
        var finalChar = polymer.charAt(polymer.length() - 1);
        counts.put(finalChar, counts.get(finalChar) + 1);

        var otherAnswer = counts.values().stream()
                .sorted()
                .toList();

        return String.valueOf(last(otherAnswer) - first(otherAnswer));
    }

    private Map<String, String> getInsertionRules(final List<String> insertionRules) {
        return insertionRules.stream()
                .map(str -> str.split(" -> "))
                .collect(Collectors.toMap(split -> split[0], split -> split[1]));
    }

    private Map<String, Long> toPairMap(final String polymer) {
        Map<String, Long> pairCounts = new HashMap<>();
        for (int i = 0; i < polymer.length() - 1; i++) {
            var pair = polymer.substring(i, i + 2);
            var count = 1L;
            if (pairCounts.containsKey(pair)) {
                count += pairCounts.get(pair);
            }
            pairCounts.put(pair, count);
        }
        return pairCounts;
    }

    private Map<String, Long> step(Map<String, Long> pairs, Map<String, String> mappings) {
        Map<String, Long> newMap = new HashMap<>();

        for (var entry : pairs.entrySet()) {
            var middleChar = mappings.get(entry.getKey());

            var start = entry.getKey().charAt(0) + middleChar;
            var end = middleChar + entry.getKey().charAt(1);

            newMap.put(start, entry.getValue() + newMap.getOrDefault(start, 0L));
            newMap.put(end, entry.getValue() + newMap.getOrDefault(end, 0L));
        }

        return newMap;
    }

    @Override
    public String solvePartTwo() {
        return solve(getInputAsList(), 40);
    }
}
