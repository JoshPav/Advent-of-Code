package solutions.day04;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
        final BingoNumber[][] boardNumbers = new BingoNumber[BOARD_SIZE][BOARD_SIZE];

        for (int i = 0; i < inputLines.size(); i++) {
            final String[] split = inputLines.get(i).trim().split("\\s+");
            for (int j = 0; j < split.length; j++) {
                boardNumbers[i][j] = new BingoNumber(Integer.parseInt(split[j]));
            }
        }

        return new BingoBoard(boardNumbers);

    }

}
