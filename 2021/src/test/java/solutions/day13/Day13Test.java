package solutions.day13;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static shared.FileUtils.getInput;

public class Day13Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("17", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("720", getDayInstance(getInput(13)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals(
                "█████\n" +
                         "█░░░█\n" +
                         "█░░░█\n" +
                         "█░░░█\n" +
                         "█████",
                getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(
                "░██░░█░░█░███░░███░░███░░░██░░█░░█░████\n" +
                        "█░░█░█░░█░█░░█░█░░█░█░░█░█░░█░█░░█░░░░█\n" +
                        "█░░█░████░█░░█░█░░█░█░░█░█░░█░█░░█░░░█░\n" +
                        "████░█░░█░███░░███░░███░░████░█░░█░░█░░\n" +
                        "█░░█░█░░█░█░░░░█░█░░█░░░░█░░█░█░░█░█░░░\n" +
                        "█░░█░█░░█░█░░░░█░░█░█░░░░█░░█░░██░░████",
                getDayInstance(getInput(13)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "6,10",
                "0,14",
                "9,10",
                "0,3",
                "10,4",
                "4,11",
                "6,0",
                "6,12",
                "4,1",
                "0,13",
                "10,12",
                "3,4",
                "3,0",
                "8,4",
                "1,10",
                "2,14",
                "8,10",
                "9,0",
                "",
                "fold along y=7",
                "fold along x=5"
        );
    }

}