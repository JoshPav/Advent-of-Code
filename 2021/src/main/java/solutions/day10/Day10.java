package solutions.day10;

import solutions.BaseDay;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Stack;
import java.util.stream.Collectors;

public class Day10 extends BaseDay {

    private static final Map<Character, Integer> SYNTAX_POINTS = Map.of(
            ')', 3,
            ']', 57,
            '}', 1197,
            '>', 25137
    );

    private static final Map<Character, Character> BRACKET_PAIRS = Map.of(
            '(', ')',
            '[', ']',
            '{', '}',
            '<', '>'
    );

    public Day10(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        var foo = getInputAsStream()
                .map(this::findFirstIllegalCharacter)
                .collect(Collectors.toList());

        return getInputAsStream()
                .map(this::findFirstIllegalCharacter)
                .filter(Objects::nonNull)
                .map(SYNTAX_POINTS::get)
                .reduce(Integer::sum)
                .map(String::valueOf)
                .orElseThrow();
    }

    private Character findFirstIllegalCharacter(String line) {

        final Stack<Character> closingBrackets = new Stack<>();
        for (char c: line.toCharArray()) {
            if (BRACKET_PAIRS.containsKey(c)) {
                closingBrackets.push(BRACKET_PAIRS.get(c));
            } else {
                var toMatch = closingBrackets.pop();
                if (toMatch != c) {
                    return c;
                }
            }
        }

        return null;
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
