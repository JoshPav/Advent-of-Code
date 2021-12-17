package solutions.day16;

public class BITReader {

    private final String message;
    private final MutableInteger addressPointer;

    public BITReader(final String hexadecimalMessage) {
        message = decode(hexadecimalMessage);
        addressPointer = new MutableInteger();
    }

    public BitPacket read() {
        int packetVersion = readBitsToInt(3);

        //  and the next three bits encode the packet type ID
        int typeId = readBitsToInt(3);

        return new LiteralBitPacket(packetVersion, readLiteralValue());
    }

    private String readBits(final int toRead) {
        return message.substring(addressPointer.value(), addressPointer.add(toRead));
    }

    private int readBitsToInt(final int toRead) {
        return Integer.parseInt( readBits(toRead), 2);
    }

    private String decode(final String hexadecimalMessage) {
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
