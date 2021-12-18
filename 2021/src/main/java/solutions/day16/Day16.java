package solutions.day16;

import solutions.BaseDay;

import java.util.List;

public class Day16 extends BaseDay {

    private static final int LITERAL_VALUE_IDENTIFIER = 4;

    public Day16(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return String.valueOf(BitPacketReader.forHexadecimal(getFirstLine()).read().getVersionSum());
    }

    @Override
    public String solvePartTwo() {
        return String.valueOf(BitPacketReader.forHexadecimal(getFirstLine()).read().getValue());
    }

}
