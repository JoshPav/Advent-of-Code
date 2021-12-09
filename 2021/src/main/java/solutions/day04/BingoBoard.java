package solutions.day04;

import lombok.Getter;
import shared.TwoDimensionalArray;

import java.util.Arrays;
import java.util.List;

public class BingoBoard {

    private final int boardSize;
    private final TwoDimensionalArray<BingoNumber> board;

    @Getter
    private boolean hasWon = false;

    public BingoBoard(List<List<BingoNumber>> board) {
        this.board = new TwoDimensionalArray<>(board);
        this.boardSize = this.board.rowCount();
    }

    public int getSumOfUnmarked() {
        return board.stream()
                .filter(num -> !num.isMarked())
                .map(BingoNumber::getNumber)
                .reduce(0, Integer::sum);
    }

    public boolean markNumber(final int numberToMark) {

        for (int row = 0; row < boardSize; row++) {
            for (int col = 0; col < boardSize; col++) {
                if (board.get(row, col).getNumber() == numberToMark) {
                    board.get(row, col).mark();

                    hasWon = (checkColumn(col) || checkRow(row));

                    return hasWon;
                }
            }
        }
        return hasWon;
    }

    private boolean checkRow(final int rowIndex) {
        return board.getRow(rowIndex).stream().allMatch(BingoNumber::isMarked);
    }

    private boolean checkColumn(final int colIndex) {
        return board.getColumn(colIndex).stream().allMatch(BingoNumber::isMarked);
    }

}
