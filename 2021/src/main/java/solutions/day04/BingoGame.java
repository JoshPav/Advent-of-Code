package solutions.day04;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public record BingoGame(List<Integer> numbersCalled,
                        List<BingoBoard> boards,
                        Map<Integer, List<BingoNumber>> numberMap) {

    public List<CompletedBoard> playBingo() {

        List<CompletedBoard> completedBoards = new ArrayList<>();

        for (Integer numberCalled : numbersCalled) {

            for (BingoNumber number : numberMap.get(numberCalled)) {
                // Update all boards
                number.check();
            }

            // Check for a winner
            for (BingoBoard board : boards) {
                if (completedBoards.stream().noneMatch(completedBoard -> completedBoard.isBoard(board))) {
                    if (board.checkWin()) {
                        completedBoards.add(new CompletedBoard(board, numberCalled));
                    }
                }
            }

        }

        return completedBoards;
    }


}
