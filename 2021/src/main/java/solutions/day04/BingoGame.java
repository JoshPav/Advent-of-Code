package solutions.day04;

import java.util.List;
import java.util.Map;

public record BingoGame(List<Integer> numbersCalled,
                        List<BingoBoard> boards,
                        Map<Integer, List<BingoNumber>> numberMap) {

    public CompletedBoard playBingo() {

        for (Integer numberCalled : numbersCalled) {

            for (BingoNumber number : numberMap.get(numberCalled)) {
                // Update all boards
                number.check();
            }

            // Check for a winner
            for (BingoBoard board : boards) {
                if (board.hasWon()) {
                    return new CompletedBoard(board, numberCalled);
                }
            }

        }

        throw new EveryoneSucksAtBingoException();
    }


}
