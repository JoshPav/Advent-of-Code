package solutions.day04;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GameParser {

    public static BingoGame parseInput(final List<String> input) {

        final List<Integer> numbersCalled = Arrays.stream(input.get(0).split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());

        List<BingoBoard> parsedBoards = new ArrayList<>();
        Map<Integer, List<BingoNumber>> numberReference = new HashMap<>();

        // Skip first two lines
        for (int i = 2; i < input.size(); i+=6) {
            // Boards are always 5 lines long + 1 line to seperate
            parsedBoards.add(new BingoBoard(createBoard(input.subList(i, i+5), numberReference)));
        }


        return new BingoGame(numbersCalled, parsedBoards, numberReference);
    }

    private static BingoNumber[][] createBoard(List<String> inputLines, final Map<Integer, List<BingoNumber>> map) {
        final BingoNumber[][] board = new BingoNumber[5][5];


        for (int i = 0; i < inputLines.size(); i++) {
            final String[] split = inputLines.get(i).trim().split("\\s+");
            for (int j = 0; j < split.length; j++) {
                final Integer parsed = Integer.parseInt(split[j]);
                BingoNumber num = new BingoNumber(parsed);

                board[i][j] = num;

                if (!map.containsKey(parsed)) {
                    map.put(parsed, new ArrayList<>());
                }
                map.get(parsed).add(num);
            }
        }

        return board;

    }

}
