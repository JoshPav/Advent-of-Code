package solutions.day16;

import org.junit.jupiter.api.Test;
import solutions.BaseTest;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static shared.FileUtils.getInput;

public class Day16Test extends BaseTest {

    @Test
    public void testPartOneActualInput() {

        assertEquals("936", getDayInstance(getInput(16)).solvePartOne());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("6802496672062", getDayInstance(getInput(16)).solvePartTwo());
    }

}