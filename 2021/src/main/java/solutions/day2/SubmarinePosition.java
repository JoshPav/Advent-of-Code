package solutions.day2;

public class SubmarinePosition {

    private int depth = 0;
    private int horizontalPosition = 0;
    private int aim = 0;

    public void applyCommand(final SubmarineCommand command) {
        switch (command.getDirection()) {
            case UP -> depth -= command.getAmount();
            case DOWN -> depth += command.getAmount();
            case FORWARD -> horizontalPosition += command.getAmount();
        }
    }


    public void applyCommandPt2(final SubmarineCommand command) {
        switch (command.getDirection()) {
            case UP ->
                aim -= command.getAmount();
            case DOWN ->
                aim += command.getAmount();
            case FORWARD -> {
                horizontalPosition += command.getAmount();
                depth += aim * command.getAmount();
            }
        }
    }

    public int computeProduct() {
        return depth * horizontalPosition;
    }

}
