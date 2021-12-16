package solutions.day16;

import org.junit.Test;
import solutions.BaseTest;

import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;
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
    public void testPartOneE() {

        assertEquals("??", getDayInstance(Collections.singletonList("D2FE28")).solvePartOne());
    }

    @Test
    public void testPartOneF() {

        assertEquals("??", getDayInstance(Collections.singletonList("38006F45291200")).solvePartOne());
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