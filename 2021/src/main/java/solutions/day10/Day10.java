package solutions.day10;

import com.google.common.collect.Iterables;
import solutions.BaseDay;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.stream.Stream;

import static solutions.day10.ChunkEnd.*;

public class Day10 extends BaseDay {

    private static final Map<Character, ChunkEnd> BRACKET_PAIRS = Map.of(
            '(', ROUND,
            '[', SQUARE,
            '{', CURLY,
            '<', ANGLE
    );

    public Day10(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return processInput()
                .filter(ProcessedLine::isInvalid)
                .map(ProcessedLine::getFirstInvalid)
                .map(ChunkEnd::getSyntaxPoints)
                .map(Integer::toUnsignedLong)
                .reduce(Long::sum)
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
        final Stack<ChunkEnd> chunkEnds = new Stack<>();
        for (char c: line.toCharArray()) {
            if (BRACKET_PAIRS.containsKey(c)) {
                chunkEnds.push(BRACKET_PAIRS.get(c));
            } else if (chunkEnds.pop().getCharacter() != c) {
                return ProcessedLine.createInvalid(ChunkEnd.parse(c));
            }
        }

        return ProcessedLine.createIncomplete(chunkEnds);
    }

    private Long calculateScoreForMissingCharacters(Stack<ChunkEnd> missing) {
        return asList(missing).stream()
                .map(ChunkEnd::getAutocompletePoints)
                .map(Integer::toUnsignedLong)
                .reduce(0L, (a, b) -> a * 5 + b);
    }

    private <T> List<T> asList(Stack<T> stack) {
        var asList = new ArrayList<>(stack);
        Collections.reverse(asList);
        return asList;
    }

}
