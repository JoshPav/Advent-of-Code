package solutions.day10;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.stream.Stream;

public class Day10 extends BaseDay {

    private static final Map<Character, Integer> SYNTAX_POINTS = Map.of(
            ')', 3,
            ']', 57,
            '}', 1197,
            '>', 25137
    );

    private static final Map<Character, Long> AUTOCOMPLETE_POINTS = Map.of(
            ')', 1L,
            ']', 2L,
            '}', 3L,
            '>', 4L
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
        return processInput()
                .filter(ProcessedLine::isInvalid)
                .map(processedLine -> SYNTAX_POINTS.get(processedLine.getFirstInvalid()))
                .reduce(Integer::sum)
                .map(String::valueOf)
                .orElseThrow();
    }

    @Override
    public String solvePartTwo() {
        var scores = processInput()
                .filter(ProcessedLine::isMissingCharacters)
                .map(processedLine -> calculateScoreForMissingCharacters(processedLine.getMissingCharacters()))
                .sorted()
                .toList();

        return String.valueOf(scores.get((scores.size()) / 2));
    }

    private Stream<ProcessedLine> processInput() {
        return getInputAsStream().map(this::processLine);
    }

    private ProcessedLine processLine(String line) {
        final Stack<Character> closingBrackets = new Stack<>();
        for (char c: line.toCharArray()) {
            if (BRACKET_PAIRS.containsKey(c)) {
                closingBrackets.push(BRACKET_PAIRS.get(c));
            } else {
                var toMatch = closingBrackets.pop();
                if (toMatch != c) {
                    return ProcessedLine.createInvalid(c);
                }
            }
        }

        return ProcessedLine.createIncomplete(closingBrackets);
    }

    private Long calculateScoreForMissingCharacters(Stack<Character> missing) {
        return asList(missing).stream()
                .map(AUTOCOMPLETE_POINTS::get)
                .reduce(0L, (a, b) -> a * 5 + b);
    }

    private <T> List<T> asList(Stack<T> stack) {
        var asList = new ArrayList<>(stack);
        Collections.reverse(asList);
        return asList;
    }

}
