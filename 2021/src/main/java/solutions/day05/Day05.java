package solutions.day05;

import shared.math.geometry.Line;
import solutions.BaseDay;

import java.util.List;
import java.util.function.Predicate;

import static java.util.stream.Collectors.groupingBy;

public class Day05 extends BaseDay {

    public Day05(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return getOverlappingPointsForPredicate(line -> !line.isDiagonal());
    }

    @Override
    public String solvePartTwo() {
        return getOverlappingPointsForPredicate(line -> true);
    }

    private String getOverlappingPointsForPredicate(final Predicate<Line> predicate) {
        return String.valueOf(getInputAsStream()
                .map(line -> Line.parse(line, "\\s->\\s"))
                .filter(predicate)
                .flatMap(pair -> pair.points().stream())
                .collect(groupingBy(a -> a))
                .values()
                .stream()
                .filter(list -> list.size() > 1)
                .count());
    }

}
