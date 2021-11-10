package exceptions;

public class NoSuchPuzzleInputException extends RuntimeException {

    public NoSuchPuzzleInputException(final Number dayNumber) {
        super("Could not read puzzle input for Day: " + dayNumber);
    }

}
