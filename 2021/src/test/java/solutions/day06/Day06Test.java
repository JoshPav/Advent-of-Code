package solutions.day06;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static utils.FileUtils.getInput;

public class Day06Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("5934", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("363101", getDayInstance(getInput(6)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("26984457539", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(null, getDayInstance(getInput(6)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of("3,4,3,1,2");
    }

}