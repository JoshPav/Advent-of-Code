package solutions.day04;

import lombok.NoArgsConstructor;

import java.util.Arrays;

@NoArgsConstructor
public class BingoBoard {

    private int boardSize;
    private BingoNumber[][] board;

    private boolean hasWon = false;

    public BingoBoard(BingoNumber[][] board) {
        this.setBoard(board);
    }

    public void setBoard(final BingoNumber[][] board) {
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
        if (!hasWon) {
            hasWon = (hasFullColumn() || hasFullRow());
        }
        return hasWon;
    }

    public boolean checkWin() {
        hasWon = (hasFullColumn() || hasFullRow());
        return hasWon;
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
