package solutions.day20;

import org.junit.jupiter.api.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static shared.FileUtils.getInput;

public class Day20Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals(null, getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals(null, getDayInstance(getInput(20)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals(null, getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(null, getDayInstance(getInput(20)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of();
    }

}