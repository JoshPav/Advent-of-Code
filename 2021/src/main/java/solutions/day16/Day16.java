package solutions.day16;

import shared.bitpacket.BitPacket;
import shared.bitpacket.BitPacketReader;
import solutions.BaseDay;

import java.util.List;

public class Day16 extends BaseDay {

    private static final int LITERAL_VALUE_IDENTIFIER = 4;

    public Day16(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        return BitPacketReader.forHexadecimal(getFirstLine()).read().getAllPackets()
                .stream()
                .map(BitPacket::getPacketVersion)
                .reduce(Integer::sum)
                .map(String::valueOf)
                .orElseThrow();
    }

    @Override
    public String solvePartTwo() {
        return String.valueOf(BitPacketReader.forHexadecimal(getFirstLine()).read().getValue());
    }

}
