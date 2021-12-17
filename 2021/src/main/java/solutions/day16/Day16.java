package solutions.day16;

import solutions.BaseDay;

import java.util.ArrayList;
import java.util.List;

public class Day16 extends BaseDay {

    private static final int LITERAL_VALUE_IDENTIFIER = 4;

    public Day16(List<String> input) {
        super(input);
    }

    @Override
    public String solvePartOne() {
        return String.valueOf(parsePacketFromInput().getVersionSum());
    }

    @Override
    public String solvePartTwo() {
        return String.valueOf(parsePacketFromInput().getValue());
    }

    private BitPacket parsePacketFromInput() {
        return parsePacket(HexadecimalParser.toBinaryString(getFirstLine(), 4)).get(0);
    }

    private boolean isNotExhausted(final String packet, final int currentIndex) {
        return !packet.substring(currentIndex)
                .chars()
                .mapToObj(num -> (char) num)
                .allMatch(c -> c.equals('0'));
    }

    private Integer parseBinary(final String binary) {
        return Integer.parseInt(binary, 2);
    }

    private List<BitPacket> parsePacket(final String packet) {

        // Every packet begins with a standard header:
        MutableInteger currIndex = new MutableInteger(0);

        List<BitPacket> packets = new ArrayList<>();

        while (currIndex.value() < packet.length() && isNotExhausted(packet, currIndex.value())) {
            // the first three bits encode the packet version
            int packetVersion = parseBinary(readBits(packet, currIndex, 3));

            //  and the next three bits encode the packet type ID
            int typeId = parseBinary(readBits(packet, currIndex, 3));

            if (typeId == LITERAL_VALUE_IDENTIFIER) {
                var parsedValue = parseLiteralValue(packet, currIndex.value());
                packets.add(new LiteralBitPacket(packetVersion, parsedValue.literalValue));
                currIndex.add(5 * parsedValue.groups);
            } else {
                if (getLengthTypeId(packet, currIndex.value()) == '0') {

                    // next 15 bits are a number that represents the total length in bits
                    int subPacketsLength = Integer.parseInt(packet.substring(currIndex.add(1), currIndex.add(15)), 2);

                    packets.add(new OperatorBitPacket(packetVersion, typeId, parsePacket(packet.substring(currIndex.value(), currIndex.add(subPacketsLength)))));
                } else {
                    // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                    int subPacketCount = Integer.parseInt(packet.substring(currIndex.add(1), currIndex.add(11)), 2);
                    var x = parseNPackets(packet, currIndex.value(), subPacketCount);
                    packets.add(new OperatorBitPacket(packetVersion, typeId, x.packets));
                    currIndex.set(x.newI);
                }
            }
        }

        return packets;
    }

    private record PacketsRead (List<BitPacket> packets, int newI) { }

    private String readBits(final String packet, final MutableInteger currIndex, final int toRead) {
        return packet.substring(currIndex.value(), currIndex.add(toRead));
    }

    private PacketsRead parseNPackets(final String packet, final int startIndex, final int toRead) {

        // Every packet begins with a standard header:
        MutableInteger currIndex = new MutableInteger(startIndex);
        int read = 0;
        List<BitPacket> packets = new ArrayList<>();

        while (currIndex.value() < packet.length() && isNotExhausted(packet, currIndex.value()) && read < toRead) {
            // the first three bits encode the packet version
            int packetVersion = parseBinary(readBits(packet, currIndex, 3));

            //  and the next three bits encode the packet type ID
            int typeId = parseBinary(readBits(packet, currIndex, 3));

            if (typeId == LITERAL_VALUE_IDENTIFIER) {
                var parsedValue = parseLiteralValue(packet, currIndex.value());
                packets.add(new LiteralBitPacket(packetVersion, parsedValue.literalValue));
                read++;
                currIndex.add(5 * parsedValue.groups);
            } else {
                // Operator type

                if (getLengthTypeId(packet, currIndex.value()) == '0') {
                    // next 15 bits are a number that represents the total length in bits
                    int subPacketsLength = Integer.parseInt(packet.substring(currIndex.add(1), currIndex.add(15)), 2);

                    packets.add(new OperatorBitPacket(packetVersion, typeId, parsePacket(packet.substring(currIndex.value(), currIndex.add(subPacketsLength)))));
                    read++;
                } else {
                    // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                    int subPacketCount = Integer.parseInt(packet.substring(currIndex.add(1), currIndex.add(11)), 2);

                    var x = parseNPackets(packet, currIndex.value(), subPacketCount);
                    packets.add(new OperatorBitPacket(packetVersion, typeId, x.packets));
                    currIndex.set(x.newI);
                    read++;
                }
            }
        }

        return new PacketsRead(packets, currIndex.value());
    }

    private char getLengthTypeId(String binaryString, int i) {
        return binaryString.charAt(i);
    }

    private record LiteralValue(long literalValue, int groups) {}

    private LiteralValue parseLiteralValue(final String binaryString, int index) {
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

}
