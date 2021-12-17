package solutions.day16;

import org.junit.Test;
import solutions.BaseTest;

import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
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