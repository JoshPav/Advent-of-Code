package solutions.day04;

public record CompletedBoard(BingoBoard completedBoard, Integer finalnumber) {

    public int getScore() {
        return completedBoard.getSumOfUnmarked() * finalnumber;
    }

}
