package solutions.day03;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static utils.FileUtils.getInput;

public class Day03Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("198", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("4006064", getDayInstance(getInput(3)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("230", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(null, getDayInstance(getInput(3)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "00100",
                "11110",
                "10110",
                "10111",
                "10101",
                "01111",
                "00111",
                "11100",
                "10000",
                "11001",
                "00010",
                "01010"
        );
    }

}