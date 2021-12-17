package solutions.day16;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class BITReaderTest {

    @Test
    public void testReadLiteral() {

        var bit = BITReader.forHexadecimal("D2FE28").read();

        assertEquals(2021, bit.getValue());
        assertEquals(PacketType.LITERAL, bit.getPacketType());
        assertEquals(6, bit.getPacketVersion());
    }

    @Test
    public void testFixedLengthOperator() {

        var bit = BITReader.forHexadecimal("38006F45291200").read();

        assertTrue(bit instanceof OperatorBitPacket);
        assertEquals(30, bit.getValue());
        assertEquals(PacketType.BIT_LENGTH, bit.getPacketType());
        assertEquals(1, bit.getPacketVersion());
    }

}
