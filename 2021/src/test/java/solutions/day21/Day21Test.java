package solutions.day21;

import org.junit.jupiter.api.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static shared.FileUtils.getInput;

public class Day21Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("739785", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("1185480", getDayInstance(getInput(21)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals(null, getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals(null, getDayInstance(getInput(21)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "Player 1 starting position: 4",
                "Player 2 starting position: 8"
        );
    }

}