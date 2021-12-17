package solutions.day16;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class BITReaderTest {

    @Test
    public void testSingleReadLiteral() {

        var bit = BITReader.forHexadecimal("D2FE28").read();

        assertEquals(2021, bit.getValue());
        assertEquals(PacketType.LITERAL, bit.getPacketType());
        assertEquals(6, bit.getPacketVersion());
    }

    @Test
    public void testSingleFixedLengthOperator() {

        var bit = BITReader.forHexadecimal("38006F45291200").read();

        assertTrue(bit instanceof OperatorBitPacket);
        assertEquals(30, bit.getValue());
        assertEquals(PacketType.BIT_LENGTH, bit.getPacketType());
        assertEquals(1, bit.getPacketVersion());
    }

    @Test
    public void testSingleFixedPacketOperator() {

        var bit = BITReader.forHexadecimal("EE00D40C823060").read();

        assertTrue(bit instanceof OperatorBitPacket);
        assertEquals(6, bit.getValue());
        assertEquals(PacketType.PACKET_LENGTH, bit.getPacketType());
        assertEquals(7, bit.getPacketVersion());
    }

    @Test
    public void testFixedLengthOperatorSimple() {

        var bit = BITReader.forHexadecimal("8A004A801A8002F478").read();

        assertTrue(bit instanceof OperatorBitPacket);
        assertEquals(16, bit.getVersionSum());
        assertEquals(4, bit.getPacketVersion());
    }

    @Test
    public void testFixedLengthOperatorComplex() {

        var bit = BITReader.forHexadecimal("620080001611562C8802118E34").read();

        assertTrue(bit instanceof OperatorBitPacket);
        assertEquals(12, bit.getVersionSum());
        assertEquals(3, bit.getPacketVersion());
    }

    @Test
    public void testFixedPacketOperatorSimple() {

        var bit = BITReader.forHexadecimal("C0015000016115A2E0802F182340").read();

        assertTrue(bit instanceof OperatorBitPacket);
        assertEquals(23, bit.getVersionSum());
    }

    @Test
    public void testFixedPacketOperatorComplex() {

        var bit = BITReader.forHexadecimal("A0016C880162017C3686B18A3D4780").read();

        assertTrue(bit instanceof OperatorBitPacket);
        assertEquals(31, bit.getVersionSum());
    }

}
