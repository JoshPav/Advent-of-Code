package solutions.day13;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static shared.FileUtils.getInput;

public class Day13Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals(null, getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals(null, getDayInstance(getInput(13)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals(null, getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(null, getDayInstance(getInput(13)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of();
    }

}