package solutions.day16;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class BITReaderTest {

    @Test
    public void testReadLiteral() {

        var bit = new BITReader("D2FE28").read();

        assertEquals(2021, bit.getValue());
        assertEquals(4, bit.getPacketTypeId());
        assertEquals(6, bit.getPacketVersion());

    }

}
