package solutions.day04;

import lombok.Getter;

import java.util.Arrays;

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
        return Arrays.stream(board).flatMap(Arrays::stream)
                .filter(num -> !num.isMarked())
                .map(BingoNumber::getNumber)
                .reduce(0, Integer::sum);
    }

    public boolean markNumber(final int numberToMark) {

        for (int row = 0; row < boardSize; row++) {
            for (int col = 0; col < boardSize; col++) {
                if (board[row][col].getNumber() == numberToMark) {
                    board[row][col].mark();

                    hasWon = (checkColumn(col) || checkRow(row));

                    return hasWon;
                }
            }
        }
        return hasWon;
    }

    private boolean checkRow(final int rowIndex) {
        return Arrays.stream(board[rowIndex]).allMatch(BingoNumber::isMarked);
    }

    private boolean checkColumn(final int colIndex) {
        for (int i = 0; i < boardSize; i++) {
            if (!board[i][colIndex].isMarked()) {
                return false;
            }
        }
        return true;
    }

}
