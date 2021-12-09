package solutions.day04;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static shared.ListUtils.parseList;

public class GameParser {

    private static final int BOARD_SIZE = 5;

    public static BingoGame parseInput(final List<String> input) {

        final List<Integer> numbersCalled = Arrays.stream(input.get(0).split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());

        List<BingoBoard> parsedBoards = new ArrayList<>();

        // Skip first two lines
        for (int i = 2; i < input.size(); i += BOARD_SIZE + 1) {
            parsedBoards.add(createBoard(input.subList(i, i + BOARD_SIZE)));
        }

        return new BingoGame(numbersCalled, parsedBoards);
    }

    private static BingoBoard createBoard(List<String> inputLines) {
        return new BingoBoard(inputLines.stream()
                .map(GameParser::toNumberList)
                .toList());
    }

    private static List<BingoNumber> toNumberList(final String str) {
        return parseList(str.trim()).stream().map(GameParser::toBingoNumber).toList();
    }

    private static BingoNumber toBingoNumber(final String num) {
        return new BingoNumber(Integer.parseInt(num));
    }

}
