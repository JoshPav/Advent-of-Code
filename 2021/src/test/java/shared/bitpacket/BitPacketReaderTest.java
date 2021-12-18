package shared.bitpacket;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class BitPacketReaderTest {

    @Test
    public void testSingleReadLiteral() {

        var packet = BitPacketReader.forHexadecimal("D2FE28").read();

        assertEquals(2021, packet.getValue());
        assertEquals(PacketType.LITERAL, packet.getPacketType());
        assertEquals(6, packet.getPacketVersion());
    }

    @Test
    public void testSingleFixedLengthOperator() {

        var packet = BitPacketReader.forHexadecimal("38006F45291200").read();

        assertTrue(packet instanceof OperatorBitPacket);

        var subPackets = packet.getSubPackets();
        assertEquals(2, subPackets.size());

        assertEquals(10, subPackets.get(0).getValue());
        assertEquals(PacketType.LITERAL, subPackets.get(0).getPacketType());
        assertEquals(20, subPackets.get(1).getValue());
        assertEquals(PacketType.LITERAL, subPackets.get(1).getPacketType());
    }

    @Test
    public void testSingleFixedPacketOperator() {

        var packet = BitPacketReader.forHexadecimal("EE00D40C823060").read();

        assertTrue(packet instanceof OperatorBitPacket);

        var subPackets = packet.getSubPackets();
        assertEquals(3, subPackets.size());

        assertEquals(1, subPackets.get(0).getValue());
        assertEquals(PacketType.LITERAL, subPackets.get(0).getPacketType());
        assertEquals(2, subPackets.get(1).getValue());
        assertEquals(PacketType.LITERAL, subPackets.get(1).getPacketType());
        assertEquals(3, subPackets.get(2).getValue());
        assertEquals(PacketType.LITERAL, subPackets.get(2).getPacketType());
    }

    @Test
    public void testFixedLengthOperatorSimple() {

        var packet = BitPacketReader.forHexadecimal("8A004A801A8002F478").read();

        assertTrue(packet instanceof OperatorBitPacket);
        assertEquals(16, sumPacketVersions(packet.getAllPackets()));
        assertEquals(4, packet.getPacketVersion());
    }

    @Test
    public void testFixedLengthOperatorComplex() {

        var packet = BitPacketReader.forHexadecimal("620080001611562C8802118E34").read();

        assertTrue(packet instanceof OperatorBitPacket);
        assertEquals(12, sumPacketVersions(packet.getAllPackets()));
        assertEquals(3, packet.getPacketVersion());
    }

    @Test
    public void testFixedPacketOperatorSimple() {

        var packet = BitPacketReader.forHexadecimal("C0015000016115A2E0802F182340").read();

        assertTrue(packet instanceof OperatorBitPacket);
        assertEquals(23, sumPacketVersions(packet.getAllPackets()));
    }

    @Test
    public void testFixedPacketOperatorComplex() {

        var packet = BitPacketReader.forHexadecimal("A0016C880162017C3686B18A3D4780").read();

        assertTrue(packet instanceof OperatorBitPacket);
        assertEquals(31, sumPacketVersions(packet.getAllPackets()));
    }

    @ParameterizedTest
    @MethodSource("getValueSource")
    public void testGetValueA(String message, long value) {
        
        var packet = BitPacketReader.forHexadecimal(message).read();
        assertEquals(value, packet.getValue());
    }

    private static Stream<Arguments> getValueSource() {
        return Stream.of(
                Arguments.of("C200B40A82", 3),
                Arguments.of("04005AC33890", 54),
                Arguments.of("880086C3E88112", 7),
                Arguments.of("CE00C43D881120", 9),
                Arguments.of("D8005AC2A8F0", 1),
                Arguments.of("F600BC2D8F", 0),
                Arguments.of("9C005AC2F8F0", 0),
                Arguments.of("9C0141080250320F1802104A08", 1)
        );
    }

    private int sumPacketVersions(List<BitPacket> packets) {
        return packets.stream().map(BitPacket::getPacketVersion).reduce(Integer::sum).orElseThrow();
    }

}
