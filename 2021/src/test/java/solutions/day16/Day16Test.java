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
    public void testPartOneActualInput() {

        assertEquals("936", getDayInstance(getInput(16)).solvePartOne());
    }

    @Test
    public void testPartTwoA() {

        assertEquals("3", getDayInstance(List.of("C200B40A82")).solvePartTwo());
    }

    @Test
    public void testPartTwoB() {

        assertEquals("54", getDayInstance(List.of("04005AC33890")).solvePartTwo());
    }

    @Test
    public void testPartTwoC() {

        assertEquals("7", getDayInstance(List.of("880086C3E88112")).solvePartTwo());
    }

    @Test
    public void testPartTwoD() {

        assertEquals("9", getDayInstance(List.of("CE00C43D881120")).solvePartTwo());
    }

    @Test
    public void testPartTwoE() {

        assertEquals("1", getDayInstance(List.of("D8005AC2A8F0")).solvePartTwo());
    }

    @Test
    public void testPartTwoF() {

        assertEquals("0", getDayInstance(List.of("F600BC2D8F")).solvePartTwo());
    }

    @Test
    public void testPartTwoG() {

        assertEquals("0", getDayInstance(List.of("9C005AC2F8F0")).solvePartTwo());
    }

    @Test
    public void testPartTwoH() {

        assertEquals("1", getDayInstance(List.of("9C0141080250320F1802104A08")).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("6802496672062", getDayInstance(getInput(16)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of();
    }

}