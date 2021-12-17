package solutions.day17;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static shared.FileUtils.getInput;

public class Day17Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("45", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("4560", getDayInstance(getInput(17)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("112", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("3344", getDayInstance(getInput(17)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of("target area: x=20..30, y=-10..-5");
    }

}