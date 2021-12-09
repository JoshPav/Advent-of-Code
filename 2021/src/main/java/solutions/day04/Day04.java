package solutions.day04;

import solutions.BaseDay;
import shared.ListUtils;

import java.util.List;
import java.util.function.Function;

public class Day04 extends BaseDay {

    public Day04(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return getBingoResultForBoard(getInputAsList(), ListUtils::first);
    }

    @Override
    public String solvePartTwo() {
        return getBingoResultForBoard(getInputAsList(), ListUtils::last);
    }

    private String getBingoResultForBoard(final List<String> input, final Function<List<CompletedBoard>, CompletedBoard> boardSupplier) {
        return String.valueOf(boardSupplier.apply(GameParser.parseInput(input).playBingo()).getScore());
    }

}
