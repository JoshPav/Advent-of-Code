package solutions.day2;

import solutions.BaseDay;

import java.util.List;
import java.util.stream.Collectors;

public class Day2 extends BaseDay {

    public Day2(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        final List<SubmarineCommand> commands = getInputAsStream().map(Day2::parseLine).collect(Collectors.toList());

        SubmarinePosition pos = new SubmarinePosition();
        commands.forEach(pos::applyCommand);

        return String.valueOf(pos.computeProduct());
    }

    private static SubmarineCommand parseLine(final String line) {
        final String[] split = line.split(" ");
        return new SubmarineCommand(Direction.valueOf(split[0].toUpperCase()), Integer.parseInt(split[1]));
    }

    @Override
    public String solvePartTwo() {
        final List<SubmarineCommand> commands = getInputAsStream().map(Day2::parseLine).collect(Collectors.toList());

        SubmarinePosition pos = new SubmarinePosition();
        commands.forEach(pos::applyCommandPt2);

        return String.valueOf(pos.computeProduct());
    }
}
