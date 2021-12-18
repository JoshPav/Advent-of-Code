package solutions.day16;

import shared.math.MutableInteger;

import java.util.ArrayList;
import java.util.List;

public class BitPacketReader {

    private final String message;
    private final MutableInteger addressPointer;
    private final int packetsToRead;

    private BitPacketReader(final String binaryMessage, final int packetsToRead) {
        this.message = binaryMessage;
        this.addressPointer = new MutableInteger();
        this.packetsToRead = packetsToRead;
    }

    public static BitPacketReader forHexadecimal(final String hexadecimalMessage) {
        return forBinary(decode(hexadecimalMessage));
    }

    public static BitPacketReader forBinary(final String binaryMessage) {
        return new BitPacketReader(binaryMessage, Integer.MAX_VALUE);
    }

    public BitPacket read() {
        return readPackets().get(0);
    }

    private List<BitPacket> readPackets() {
        List<BitPacket> packets = new ArrayList<>();
        int packetsRead = 0;

        while (!isExhausted() && packetsRead < packetsToRead) {
            int packetVersion = readBitsToInt(3);
            PacketType packetType = PacketType.parse(readBitsToInt(3));
            if (PacketType.LITERAL.equals(packetType)) {
                packets.add(new LiteralBitPacket(packetVersion, readLiteralValue()));
            } else if (readBitsToInt(1) == 0){
                    packets.add(new OperatorBitPacket(packetVersion, packetType, readPacketsInBits()));
            } else {
                packets.add(new OperatorBitPacket(packetVersion, packetType, readNPackets()));
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
        return BitPacketReader.forBinary(readBits(subPacketsLength)).readPackets();
    }

    /**
     * Reads the next eleven bits to determine N - the amount of packets to read.
     * Then reads and returns the next N packets.
     */
    private List<BitPacket> readNPackets() {
        int subPacketCount = readBitsToInt(11);
        BitPacketReader subPacketReader = new BitPacketReader(remainingMessage(), subPacketCount);
        var packets = subPacketReader.readPackets();

        // Update the address pointer so it is at the same point the sub packet parser left off.
        addressPointer.set(message.length() - subPacketReader.remainingMessage().length());
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

}
