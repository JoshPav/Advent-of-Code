package solutions.day16;

import java.util.ArrayList;
import java.util.List;

public class BITReader {

    private final String message;
    private final MutableInteger addressPointer;
    private final int packetsToRead;

    private BITReader(final String binaryMessage) {
        this(binaryMessage, Integer.MAX_VALUE);
    }

    private BITReader(final String binaryMessage, final int packetsToRead) {
        this.message = binaryMessage;
        this.addressPointer = new MutableInteger();
        this.packetsToRead = packetsToRead;
    }

    public static BITReader forHexadecimal(final String hexadecimalMessage) {
        return new BITReader(decode(hexadecimalMessage));
    }

    public BitPacket read() {
        return readPackets().get(0);
    }

    private List<BitPacket> readPackets() {
        List<BitPacket> packets = new ArrayList<>();
        int packetsRead = 0;

        while (!isExhausted() && packetsRead < packetsToRead) {
            int packetVersion = readBitsToInt(3);

            if (PacketType.LITERAL.equals(readBitsToInt(3))) {
                packets.add(new LiteralBitPacket(packetVersion, readLiteralValue()));
            } else if (PacketType.BIT_LENGTH.equals(readBitsToInt(1))){
                packets.add(new OperatorBitPacket(packetVersion, PacketType.BIT_LENGTH, readPacketsInBits()));
            } else {
                packets.add(new OperatorBitPacket(packetVersion, PacketType.PACKET_LENGTH, readNPackets()));
            }
            packetsRead++;
        }

        return packets;
    }

    /**
     * Reads in groups of five bits until a group is prefixed by 0.
     * The literal value is the parsed value of the bits concatenated together.
     */
    private Long readLiteralValue() {
        StringBuilder binary = new StringBuilder();

        String groupStart;
        do {
            groupStart = readBits(1);
            binary.append(readBits(4));

        } while (!groupStart.equals("0"));

        return Long.parseLong(binary.toString(), 2);
    }

    /**
     * Reads the next fifteen bits to determine N - the amount of bits to read for the next packet(s).
     * Then reads the next N bits and returns the packet(s) in these bits.
     */
    private List<BitPacket> readPacketsInBits() {
        int subPacketsLength = readBitsToInt(15);
        return new BITReader(readBits(subPacketsLength)).readPackets();
    }

    /**
     * Reads the next eleven bits to determine N - the amount of packets to read.
     * Then reads and returns the next N packets.
     */
    private List<BitPacket> readNPackets() {
        int subPacketCount = readBitsToInt(11);
        return new BITReader(remainingMessage(), subPacketCount).readPackets();
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

}
