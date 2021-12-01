package solutions.day1;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static utils.FileUtils.getInput;

public class Day1Test {

    @Test
    public void testPartOne() {

        assertEquals("7", new Day1(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("1696", new Day1(getInput(1)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("5", new Day1(getTestInput()).solvePartTwo());
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
