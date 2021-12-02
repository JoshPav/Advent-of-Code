package solutions.day01;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static utils.FileUtils.getInput;

public class Day01Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("7", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("1696", getDayInstance(getInput(1)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("5", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("1737", getDayInstance(getInput(1)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of("199",
                "200",
                "208",
                "210",
                "200",
                "207",
                "240",
                "269",
                "260",
                "263");
    }

}
