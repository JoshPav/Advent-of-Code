package solutions.day04;

import lombok.Getter;

import java.util.Arrays;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class BingoBoard {

    private final int boardSize;
    private final BingoNumber[][] board;

    @Getter
    private boolean hasWon = false;

    public BingoBoard(BingoNumber[][] board) {
        this.board = board;
        this.boardSize = board.length;
    }

    public int getSumOfUnmarked() {
        return getMatchingNumbers(num -> !num.isMarked())
                .map(BingoNumber::getNumber)
                .reduce(0, Integer::sum);
    }

    public boolean markNumber(final int numberToMark) {

        getMatchingNumbers(num -> num.getNumber() == numberToMark)
                .findFirst()
                .ifPresent(toMark -> {
                    toMark.mark();
                    checkWin();
                });

        return hasWon;
    }

    private Stream<BingoNumber> getMatchingNumbers(final Predicate<BingoNumber> predicate) {
        return Arrays.stream(board).flatMap(Arrays::stream).filter(predicate);
    }

    private void checkWin() {
        hasWon = (hasFullColumn() || hasFullRow());
    }

    private boolean hasFullRow() {
        for (int rowI = 0; rowI < boardSize; rowI++) {
            if (checkRow(board[rowI])) {
                return true;
            }
        }
        return false;
    }

    private boolean checkRow(final BingoNumber[] row) {
        return Arrays.stream(row).allMatch(BingoNumber::isMarked);
    }

    private boolean hasFullColumn() {
        for (int columnI = 0; columnI < boardSize; columnI++) {
            boolean complete = true;

            for (int rowI = 0; rowI < boardSize; rowI++) {
                if (!board[rowI][columnI].isMarked()) {
                    complete = false;
                    break;
                }

            }
            if (complete) {
                return true;
            }
        }
        return false;
    }

}
