package solutions.day15;

import org.junit.jupiter.api.Test;
import solutions.BaseTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static shared.FileUtils.getInput;

public class Day15Test extends BaseTest {

    @Test
    public void testPartOne() {

        assertEquals("40", getDayInstance(getTestInput()).solvePartOne());
    }

    @Test
    public void testPartOneActualInput() {

        assertEquals("386", getDayInstance(getInput(15)).solvePartOne());
    }

    @Test
    public void testPartTwo() {

        assertEquals("315", getDayInstance(getTestInput()).solvePartTwo());
    }

    @Test
    public void testPartTwoActualInput() {

        assertEquals("2806", getDayInstance(getInput(15)).solvePartTwo());
    }

    private List<String> getTestInput() {
        return List.of(
                "1163751742",
                "1381373672",
                "2136511328",
                "3694931569",
                "7463417111",
                "1319128137",
                "1359912421",
                "3125421639",
                "1293138521",
                "2311944581"
        );
    }

}