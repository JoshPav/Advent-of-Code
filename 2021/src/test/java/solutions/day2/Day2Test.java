package solutions.day2;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static utils.FileUtils.getInput;

public class Day2Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("150", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("1714680", getDayInstance(getInput(2)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("900", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("1963088820", getDayInstance(getInput(2)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "forward 5",
                "down 5",
                "forward 8",
                "up 3",
                "down 8",
                "forward 2"
        );
    }

}