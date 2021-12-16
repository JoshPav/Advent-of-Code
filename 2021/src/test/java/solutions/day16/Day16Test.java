package solutions.day16;

import org.junit.Test;
import solutions.BaseTest;

import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static shared.FileUtils.getInput;

public class Day16Test extends BaseTest {

    @Test
    public void testPartOneA() {

        assertEquals("16", getDayInstance(Collections.singletonList("8A004A801A8002F478")).solvePartOne());
    }

    @Test
    public void testPartOneB() {

        assertEquals("12", getDayInstance(Collections.singletonList("620080001611562C8802118E34")).solvePartOne());
    }

    @Test
    public void testPartOneC() {

        assertEquals("23", getDayInstance(Collections.singletonList("C0015000016115A2E0802F182340")).solvePartOne());
    }

    @Test
    public void testPartOneD() {

        assertEquals("31", getDayInstance(Collections.singletonList("A0016C880162017C3686B18A3D4780")).solvePartOne());
    }

    @Test
    public void testParseLiteralPacket() {

        var packet = Day16.parsePacket("110100101111111000101000", 0, new Day16.Version(0)).get(0);

        assertTrue(packet instanceof LiteralBitPacket);
        assertEquals(2021, ((LiteralBitPacket) packet).getLiteralValue());
        assertEquals(6, packet.getPacketVersion());
    }

    @Test
    public void testFixedLength() {

        var packets = Day16.parsePacket("00111000000000000110111101000101001010010001001000000000", 0, new Day16.Version(0));

        assertEquals(2, packets.size());
        assertEquals(10, ((LiteralBitPacket) packets.get(0)).getLiteralValue());
        assertEquals(20, ((LiteralBitPacket) packets.get(1)).getLiteralValue());

    }

    @Test
    public void testFixedPacketAmount() {

        var packets = Day16.parsePacket("11101110000000001101010000001100100000100011000001100000", 0, new Day16.Version(0));

        assertEquals(3, packets.size());
        assertEquals(1, ((LiteralBitPacket) packets.get(0)).getLiteralValue());
        assertEquals(2, ((LiteralBitPacket) packets.get(1)).getLiteralValue());
        assertEquals(3, ((LiteralBitPacket) packets.get(2)).getLiteralValue());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals(null, getDayInstance(getInput(16)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals(null, getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(null, getDayInstance(getInput(16)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of();
    }

}