package solutions.day11;

import org.junit.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static shared.FileUtils.getInput;

public class Day11Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("1656", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("1603", getDayInstance(getInput(11)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("195", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("222", getDayInstance(getInput(11)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "5483143223",
                "2745854711",
                "5264556173",
                "6141336146",
                "6357385478",
                "4167524645",
                "2176841721",
                "6882881134",
                "4846848554",
                "5283751526"
        );
    }

}