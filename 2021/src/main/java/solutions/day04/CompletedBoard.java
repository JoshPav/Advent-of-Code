package solutions.day04;

public record CompletedBoard(BingoBoard completedBoard, Integer finalnumber) {

    public boolean isBoard(BingoBoard bingoBoard) {
        return bingoBoard == completedBoard;
    }

    public int getScore() {
        return completedBoard.getSumOfUnmarked() * finalnumber;
    }

}