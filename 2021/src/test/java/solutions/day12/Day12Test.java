package solutions.day12;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static shared.FileUtils.getInput;

public class Day12Test extends BaseTest {

    @Test
    public void testPartOneA() {

            assertEquals("10", getDayInstance(getTestInputA()).solvePartOne());
    }

    @Test
    public void testPartOneB() {

        assertEquals("19", getDayInstance(getTestInputB()).solvePartOne());
    }

    @Test
    public void testPartOneC() {

        assertEquals("226", getDayInstance(getTestInputC()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals(null, getDayInstance(getInput(12)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals(null, getDayInstance(getTestInputA()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(null, getDayInstance(getInput(12)).solvePartTwo());
    }

    private List<String> getTestInputA() {
        return List.of(
                "start-A",
                "start-b",
                "A-c",
                "A-b",
                "b-d",
                "A-end",
                "b-end"
        );
    }

    private List<String> getTestInputB() {
        return List.of(
                "dc-end",
                "HN-start",
                "start-kj",
                "dc-start",
                "dc-HN",
                "LN-dc",
                "HN-end",
                "kj-sa",
                "kj-HN",
                "kj-dc"
        );
    }

    private List<String> getTestInputC() {
        return List.of(
                "fs-end",
                "he-DX",
                "fs-he",
                "start-DX",
                "pj-DX",
                "end-zg",
                "zg-sl",
                "zg-pj",
                "pj-he",
                "RW-he",
                "fs-DX",
                "pj-RW",
                "zg-RW",
                "start-pj",
                "he-WI",
                "zg-he",
                "pj-fs",
                "start-RW"
        );
    }

}