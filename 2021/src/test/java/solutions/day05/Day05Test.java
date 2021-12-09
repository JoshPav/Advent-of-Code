package solutions.day05;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static shared.FileUtils.getInput;

public class Day05Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("5", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("5124", getDayInstance(getInput(5)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("12", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("19771", getDayInstance(getInput(5)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "0,9 -> 5,9",
                "8,0 -> 0,8",
                "9,4 -> 3,4",
                "2,2 -> 2,1",
                "7,0 -> 7,4",
                "6,4 -> 2,0",
                "0,9 -> 2,9",
                "3,4 -> 1,4",
                "0,0 -> 8,8",
                "5,5 -> 8,2"
        );
    }

}