package solutions.day04;

public record CompletedBoard(BingoBoard completedBoard, Integer finalNumber) {

    public int getScore() {
        return completedBoard.getSumOfUnmarked() * finalNumber;
    }

}
