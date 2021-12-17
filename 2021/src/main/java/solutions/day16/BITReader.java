package solutions.day16;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

public class BITReader {

    private final String message;
    private final MutableInteger addressPointer;

    private BITReader(final String binaryMessage) {
        message = binaryMessage;
        addressPointer = new MutableInteger();
    }

    public static BITReader forHexadecimal(final String hexadecimalMessage) {
        return new BITReader(decode(hexadecimalMessage));
    }

    public BitPacket read() {
        return readPackets().get(0);
    }

    private List<BitPacket> readPackets() {
        List<BitPacket> packets = new ArrayList<>();

        while (!isExhausted()) {
            int packetVersion = readBitsToInt(3);

            if (PacketType.LITERAL.equals(readBitsToInt(3))) {
                packets.add(new LiteralBitPacket(packetVersion, readLiteralValue()));
            } else if (PacketType.BIT_LENGTH.equals(readBitsToInt(1))){
                // BIT_LENGTH
                int subPacketsLength = readBitsToInt(15);
                packets.add(new OperatorBitPacket(packetVersion, PacketType.BIT_LENGTH, new BITReader(readBits(subPacketsLength)).readPackets()));
            } else {
                // FIXED LENGTH
            }
        }

        return packets;
    }

    private boolean isExhausted() {
        return addressPointer.value() > message.length()
                || remainingMessage().chars().map(Character::getNumericValue).allMatch(num -> num == 0);
    }

    private String remainingMessage() {
        return message.substring(addressPointer.value());
    }

    private String readBits(final int toRead) {
        return message.substring(addressPointer.value(), addressPointer.add(toRead));
    }

    private int readBitsToInt(final int toRead) {
        return Integer.parseInt( readBits(toRead), 2);
    }

    private static String decode(final String hexadecimalMessage) {
        return HexadecimalParser.toBinaryString(hexadecimalMessage, 4);
    }

    private Long readLiteralValue() {
        StringBuilder binary = new StringBuilder();

        String groupStart;
        do {
            groupStart = readBits(1);
            binary.append(readBits(4));

        } while (!groupStart.equals("0"));

        return Long.parseLong(binary.toString(), 2);
    }

}
