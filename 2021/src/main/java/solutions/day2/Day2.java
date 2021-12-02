package solutions.day2;

import solutions.BaseDay;

import java.util.List;

public class Day2 extends BaseDay {

    public Day2(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return computeAnswerForInitialPosition(new CommandApplierPt1());
    }

    @Override
    public String solvePartTwo() {
        return computeAnswerForInitialPosition(new CommandApplierPt2());
    }

    private String computeAnswerForInitialPosition(final CommandApplier applier) {
        final SubmarinePosition position = new SubmarinePosition();
        getInputAsStream().map(Day2::parseLine).forEach(command -> applier.applyCommand(position, command));
        return String.valueOf(position.computeProduct());
    }

    private static SubmarineCommand parseLine(final String line) {
        final String[] split = line.split(" ");
        return new SubmarineCommand(Direction.valueOf(split[0].toUpperCase()), Integer.parseInt(split[1]));
    }
}
