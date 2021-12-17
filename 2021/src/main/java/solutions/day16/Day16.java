package solutions.day16;

import lombok.AllArgsConstructor;
import lombok.Getter;
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

        var x = parsePacket(binary, 0);

        return String.valueOf(x.get(0).getVersionSum());
    }

    private static List<BitPacket> parsePacket(final String packet, final int startIndex) {

        // Every packet begins with a standard header:
        int i = startIndex;

        List<BitPacket> packets = new ArrayList<>();

        while (i < packet.length() && !packet.substring(i).chars().mapToObj(num -> (char) num).allMatch(c -> c.equals('0'))) {
            // the first three bits encode the packet version
            Integer packetVersion = BINARY_NUMBERS.get("0" + packet.substring(i, i + 3));
            i += 3;

            //  and the next three bits encode the packet type ID
            Integer typeId = BINARY_NUMBERS.get("0" + packet.substring(i, i + 3));

            i += 3;

            if (typeId == LITERAL_VALUE_IDENTIFIER) {
                var parsedValue = parseLiteralValue(packet, i);
                packets.add(new LiteralBitPacket(packetVersion, parsedValue.literalValue));
                i += 5 * parsedValue.groups;
            } else {
                // Operator type

                if (getLengthTypeId(packet, i) == '0') {
                    i++;
                    // next 15 bits are a number that represents the total length in bits
                    int subPacketsLength = Integer.parseInt(packet.substring(i, i + 15), 2);
                    i += 15;
                    packets.add(new OperatorBitPacket(packetVersion, typeId, parsePacket(packet.substring(i, i + subPacketsLength), 0)));
                    i += subPacketsLength;
                } else {
                    i++;
                    // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                    int subPacketCount = Integer.parseInt(packet.substring(i, i + 11), 2);
                    i += 11;
                    var x = parseNPackets(packet, i, subPacketCount);
                    packets.add(new OperatorBitPacket(packetVersion, typeId, x.packets));
                    i = x.newI;
                }
            }
        }

        return packets;
    }

    private record PacketsRead (List<BitPacket> packets, int newI) { }

    private static PacketsRead parseNPackets(final String packet, final int startIndex, final int toRead) {

        // Every packet begins with a standard header:
        int i = startIndex;
        int read = 0;
        List<BitPacket> packets = new ArrayList<>();

        while (i < packet.length() && !packet.substring(i).chars().mapToObj(num -> (char) num).allMatch(c -> c.equals('0')) && read < toRead) {
            // the first three bits encode the packet version
            Integer packetVersion = BINARY_NUMBERS.get("0" + packet.substring(i, i + 3));

            i += 3;

            //  and the next three bits encode the packet type ID
            Integer typeId = BINARY_NUMBERS.get("0" + packet.substring(i, i + 3));

            i += 3;

            if (typeId == LITERAL_VALUE_IDENTIFIER) {
                var parsedValue = parseLiteralValue(packet, i);
                packets.add(new LiteralBitPacket(packetVersion, parsedValue.literalValue));
                read++;
                i += 5 * parsedValue.groups;
            } else {
                // Operator type

                if (getLengthTypeId(packet, i) == '0') {
                    i++;
                    // next 15 bits are a number that represents the total length in bits
                    int subPacketsLength = Integer.parseInt(packet.substring(i, i + 15), 2);
                    i += 15;
                    packets.add(new OperatorBitPacket(packetVersion, typeId, parsePacket(packet.substring(i, i + subPacketsLength), 0)));
                    i += subPacketsLength;
                    read++;
                } else {
                    i++;
                    // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                    int subPacketCount = Integer.parseInt(packet.substring(i, i + 11), 2);
                    i += 11;
                    var x = parseNPackets(packet, i, subPacketCount);
                    packets.add(new OperatorBitPacket(packetVersion, typeId, x.packets));
                    i = x.newI;
                    read++;
                }
            }
        }

        return new PacketsRead(packets, i);
    }

    private static char getLengthTypeId(String binaryString, int i) {
        return binaryString.charAt(i);
    }

    private record LiteralValue(long literalValue, int groups) {}

    private static LiteralValue parseLiteralValue(final String binaryString, int index) {
        List<String> binaryStrings = new ArrayList<>();
        var lastGroup = false;
        while (!lastGroup) {
            if (binaryString.charAt(index) == '0') {
                lastGroup = true;
            }
            binaryStrings.add(binaryString.substring(index + 1, index + 5));
            index += 5;
        }

        var str = binaryStrings.stream().reduce(String::concat).orElseThrow();

        return new LiteralValue(
                Long.parseLong(str, 2),
                binaryStrings.size());
    }

    @Override
    public String solvePartTwo() {

        String binary = getFirstLine().chars()
                .mapToObj(num -> HEX_BINARY.get((char) num))
                .reduce(String::concat)
                .orElseThrow();

        var packets = parsePacket(binary, 0);

        return String.valueOf(packets.get(0).getValue());
    }
}
