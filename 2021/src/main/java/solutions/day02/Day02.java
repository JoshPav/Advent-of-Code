package solutions.day02;

import solutions.BaseDay;

import java.util.List;

public class Day02 extends BaseDay {

    public Day02(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return computeAnswerForInitialPosition((position, command) -> {
                switch (command.direction()) {
                    case UP -> position.depth -= command.amount();
                    case DOWN -> position.depth += command.amount();
                    case FORWARD -> position.horizontalPosition += command.amount();
                }
        });
    }

    @Override
    public String solvePartTwo() {
        return computeAnswerForInitialPosition((position, command) -> {
            final int amount = command.amount();
            switch (command.direction()) {
                case UP -> position.aim -= amount;
                case DOWN -> position.aim += amount;
                case FORWARD -> {
                    position.depth += position.aim * amount;
                    position.horizontalPosition += amount;
                }
            }
        });
    }

    private String computeAnswerForInitialPosition(final CommandApplier applier) {
        final SubmarinePosition position = new SubmarinePosition();
        getInputAsStream().map(Day02::parseLine).forEach(command -> applier.applyCommand(position, command));
        return String.valueOf(position.computeProduct());
    }

    private static SubmarineCommand parseLine(final String line) {
        final String[] split = line.split(" ");
        return new SubmarineCommand(Direction.valueOf(split[0].toUpperCase()), Integer.parseInt(split[1]));
    }
}
