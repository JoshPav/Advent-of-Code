package solutions.day2;

public class CommandApplierPt2 implements CommandApplier {

    @Override
    public void applyCommand(SubmarinePosition position, SubmarineCommand command) {
        final int amount = command.amount();
        switch (command.direction()) {
            case UP -> position.aim -= amount;
            case DOWN -> position.aim += amount;
            case FORWARD -> {
                position.depth += position.aim * amount;
                position.horizontalPosition += amount;
            }
        }
    }

}
