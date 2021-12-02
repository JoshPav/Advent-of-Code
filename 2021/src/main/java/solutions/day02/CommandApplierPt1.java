package solutions.day02;

public class CommandApplierPt1 implements CommandApplier {

    @Override
    public void applyCommand(SubmarinePosition position, SubmarineCommand command) {
        switch (command.direction()) {
            case UP -> position.depth -= command.amount();
            case DOWN -> position.depth += command.amount();
            case FORWARD -> position.horizontalPosition += command.amount();
        }
    }

}
