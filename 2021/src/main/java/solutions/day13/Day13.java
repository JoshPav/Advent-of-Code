package solutions.day13;

import solutions.BaseDay;

import java.util.List;

public class Day13 extends BaseDay {

    public Day13(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        var manual = new ThermalManualInstructions(getInputAsList());
        manual.followNextInstruction();
        return String.valueOf(manual.visibleDots());
    }

    @Override
    public String solvePartTwo() {
        var manual = new ThermalManualInstructions(getInputAsList());
        manual.followAllInstructions();
        return manual.readDots();
    }

}
