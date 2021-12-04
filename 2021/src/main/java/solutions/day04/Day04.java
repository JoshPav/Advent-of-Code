package solutions.day04;

import solutions.BaseDay;

import java.util.List;

public class Day04 extends BaseDay {

    public Day04(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        final BingoGame game = GameParser.parseInput(getInputAsList());

        final CompletedBoard winner = game.playBingo().get(0);

        return String.valueOf(winner.getScore());
    }

    @Override
    public String solvePartTwo() {
        final BingoGame game = GameParser.parseInput(getInputAsList());

        final List<CompletedBoard> results = game.playBingo();

        final CompletedBoard loser = results.get(results.size() - 1);

        return String.valueOf(loser.getScore());
    }
}
