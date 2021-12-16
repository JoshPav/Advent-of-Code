package solutions.day16;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.Map.entry;

public class Day16 extends BaseDay {

    private static final Map<Character, String> HEX_BINARY = Map.ofEntries(
            entry('0', "0000"),
            entry('1', "0001"),
            entry('2', "0010"),
            entry('3', "0011"),
            entry('4', "0100"),
            entry('5', "0101"),
            entry('6', "0110"),
            entry('7', "0111"),
            entry('8', "1000"),
            entry('9', "1001"),
            entry('A', "1010"),
            entry('B', "1011"),
            entry('C', "1100"),
            entry('D', "1101"),
            entry('E', "1110"),
            entry('F', "1111")
    );

    private static final Map<String, Integer> BINARY_NUMBERS = Map.of(
            "0000", 0,
            "0001", 1,
            "0010", 2,
            "0011", 3,
            "0100", 4,
            "0101", 5,
            "0110", 6,
            "0111", 7,
            "1000", 8,
            "1001", 9
    );

    private static final int LITERAL_VALUE_IDENTIFIER = 4;

    public Day16(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {

        String binary = getFirstLine().chars()
                .mapToObj(num -> HEX_BINARY.get((char) num))
                .reduce(String::concat)
                .orElseThrow();

        parsePacket(binary, 0);
    }

    private Integer parsePacket(final String packet, final int startIndex) {

        // Every packet begins with a standard header:
        int i = startIndex;

        // the first three bits encode the packet version
        Integer packetVersion = BINARY_NUMBERS.get("0" + packet.substring(i, i + 3));

        i += 3;

        //  and the next three bits encode the packet type ID
        Integer typeId = BINARY_NUMBERS.get("0" + packet.substring(i, i + 3));

        i += 3;

        if (typeId == LITERAL_VALUE_IDENTIFIER) {
            int literalValue = parseLiteralValue(packet, i);
            return packetVersion;
        } else {
            // Operator type

            if (getLengthTypeId(packet, i) == '0') {
                i++;
                // next 15 bits are a number that represents the total length in bits
                int subPacketsLength = Integer.parseInt(packet.substring(i, i + 15), 2);
            } else {
                i++;
                // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                int subPacketCount = Integer.parseInt(packet.substring(i, i + 11), 2);

            }
        }

    }

    private char getLengthTypeId(String binaryString, int i) {
        return binaryString.charAt(i);
    }

    private Integer parseLiteralValue(final String binaryString, final int startIndex) {
        List<String> binaryStrings = new ArrayList<>();

        var i = startIndex;
        var lastGroup = false;
        while (!lastGroup) {
            if (binaryString.charAt(i) == '0') {
                lastGroup = true;
            }
            binaryStrings.add(binaryString.substring(i + 1, i + 5));
            i += 5;
        }

        return Integer.parseInt(binaryStrings.stream().reduce(String::concat).orElseThrow(), 2);
    }

    @Override
    public String solvePartTwo() {
        return null;
    }
}
