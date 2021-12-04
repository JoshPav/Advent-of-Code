package solutions.day04;

import java.util.ArrayList;
import java.util.List;

public record BingoGame(List<Integer> numbersCalled,
                        List<BingoBoard> boards) {

    public List<CompletedBoard> playBingo() {

        List<CompletedBoard> completedBoards = new ArrayList<>();

        for (Integer numberCalled : numbersCalled) {

            final List<BingoBoard> completedThisRound = new ArrayList<>();
            for (BingoBoard board : boards) {

                if (board.markNumber(numberCalled)) {
                    completedBoards.add(new CompletedBoard(board, numberCalled));
                    completedThisRound.add(board);
                }

            }
            boards.removeAll(completedThisRound);

        }

        return completedBoards;
    }


}
