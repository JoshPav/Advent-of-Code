package solutions.day04;

import java.util.Arrays;

public class BingoBoard {

    private final int boardSize;
    private final BingoNumber[][] board;

    public BingoBoard(BingoNumber[][] board) {
        this.board = board;
        this.boardSize = board.length;
    }

    public int getSumOfUnmarked() {
        return Arrays.stream(board).flatMap(Arrays::stream)
                .filter(num -> !num.isChecked())
                .map(BingoNumber::getNumber)
                .reduce(0, Integer::sum);
    }

    public boolean hasWon() {
        return hasFullColumn() || hasFullRow();
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
        return Arrays.stream(row).allMatch(BingoNumber::isChecked);
    }

    private boolean hasFullColumn() {
        for (int columnI = 0; columnI < boardSize; columnI++) {
            boolean checked = true;

            for (int rowI = 0; rowI < boardSize; rowI++) {
                if (!board[rowI][columnI].isChecked()) {
                    checked = false;
                    break;
                }

            }
            if (checked) {
                return true;
            }
        }
        return false;
    }

}
