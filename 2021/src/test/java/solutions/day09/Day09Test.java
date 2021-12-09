package solutions.day09;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static utils.FileUtils.getInput;

public class Day09Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("15", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("452", getDayInstance(getInput(9)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("1134", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("1263735", getDayInstance(getInput(9)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "2199943210",
                "3987894921",
                "9856789892",
                "8767896789",
                "9899965678"
        );
    }

}